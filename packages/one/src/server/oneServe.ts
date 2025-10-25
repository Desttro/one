import { default as FSExtra } from 'fs-extra'
import type { Hono, MiddlewareHandler } from 'hono'
import type { BlankEnv } from 'hono/types'
import { extname, join } from 'node:path'
import { getServerEntry, serveStatic } from 'vxrn/serve'
import { LOADER_JS_POSTFIX_UNCACHED, PRELOAD_JS_POSTFIX } from '../constants'
import {
  compileManifest,
  getURLfromRequestURL,
  runMiddlewares,
  type RequestHandlers,
} from '../createHandleRequest'
import type { PlatformContext, RenderAppProps } from '../types'
import { getPathFromLoaderPath } from '../utils/cleanUrl'
import { toAbsolute } from '../utils/toAbsolute'
import type { One, RouteInfo } from '../vite/types'
import type { RouteInfoCompiled } from './createRoutesManifest'
import { serveStaticAssets } from 'vxrn'
import { isRolldown } from '../utils/isRolldown'

export type ModuleLoaders = {
  loadRouteModule?: (route: RouteInfo<string>) => Promise<any>
  loadAPIModule?: (route: RouteInfo<string>) => Promise<any>
  loadMiddlewareModule?: (contextKey: string) => Promise<any>
}

export async function oneServe(
  oneOptions: One.PluginOptions,
  buildInfo: One.BuildInfo,
  app: Hono,
  moduleLoaders: ModuleLoaders = {}
) {
  const { resolveAPIRoute, resolveLoaderRoute, resolvePageRoute } = await import(
    '../createHandleRequest'
  )
  const { isResponse } = await import('../utils/isResponse')
  const { isStatusRedirect } = await import('../utils/isStatus')

  const isAPIRequest = new WeakMap<any, boolean>()

  // add redirects
  const redirects = oneOptions.web?.redirects
  if (redirects) {
    for (const redirect of redirects) {
      app.get(redirect.source, (context) => {
        const destinationUrl = redirect.destination.replace(/:\w+/g, (param) => {
          const paramName = param.substring(1)
          return context.req.param(paramName) || ''
        })
        return context.redirect(destinationUrl, redirect.permanent ? 301 : 302)
      })
    }
  }

  if (!buildInfo) {
    throw new Error(`No build info found, have you run build?`)
  }

  const { routeToBuildInfo, routeMap } = buildInfo as One.BuildInfo
  const apiRouteModuleMap = buildInfo.apiRouteModules || {}

  const serverOptions = {
    ...oneOptions,
    root: '.',
  }

  const entryServer = getServerEntry(serverOptions)
  const entry = await import(entryServer)

  const render = entry.default.render as (props: RenderAppProps) => any
  const apiCJS = oneOptions.build?.api?.outputFormat === 'cjs'

  const useRolldown = await isRolldown()

  const loadRouteModule =
    moduleLoaders.loadRouteModule ??
    (async (route: RouteInfo<string>) => {
      const build = routeToBuildInfo[route.file]
      if (!build?.serverJsPath) {
        throw new Error(`No server bundle found for route ${route.file}`)
      }
      return await import(toAbsolute(build.serverJsPath))
    })

  const loadAPIModule =
    moduleLoaders.loadAPIModule ??
    (async (route: RouteInfo<string>) => {
      const mappedPath = apiRouteModuleMap[route.file]
      if (mappedPath) {
        return await import(toAbsolute(mappedPath))
      }

      const fileName = useRolldown
        ? route.page.slice(1)
        : route.page
            .slice(1)
            .replace(/\[/g, '_')
            .replace(/\]/g, '_')
      const apiFile = join(process.cwd(), 'dist', 'api', fileName + (apiCJS ? '.cjs' : '.js'))
      return await import(apiFile)
    })

  const loadMiddlewareModule =
    moduleLoaders.loadMiddlewareModule ??
    (async (contextKey: string) => {
      return await import(toAbsolute(contextKey))
    })

  const requestHandlers: RequestHandlers = {
    async handleAPI({ route }) {
      return await loadAPIModule(route as RouteInfo<string>)
    },

    async loadMiddleware(route) {
      return await loadMiddlewareModule(route.contextKey)
    },

    async handleLoader({ request, route, url, loaderProps }) {
      const exports = await loadRouteModule(route as RouteInfo<string>)

      const { loader } = exports

      if (!loader) {
        console.warn(`No loader found in exports`, route.file)
        return null
      }

      const json = await loader(loaderProps)

      return `export function loader() { return ${JSON.stringify(json)} }`
    },

    async handlePage({ route, url, loaderProps }) {
      const buildInfo = routeToBuildInfo[route.file]

      if (route.type === 'ssr') {
        if (!buildInfo) {
          console.error(`Error in route`, route)
          throw new Error(
            `No buildinfo found for ${url}, route: ${route.file}, in keys:\n  ${Object.keys(routeToBuildInfo).join('\n  ')}`
          )
        }

        try {
          const exported = await loadRouteModule(route as RouteInfo<string>)
          const loaderData = await exported.loader?.(loaderProps)
          const preloads = buildInfo.preloads

          const headers = new Headers()
          headers.set('content-type', 'text/html')

          const rendered = await render({
            mode: route.type,
            loaderData,
            loaderProps,
            path: loaderProps?.path || '/',
            preloads,
            css: buildInfo.css,
          })

          return new Response(rendered, {
            headers,
            status: route.isNotFound ? 404 : 200,
          })
        } catch (err) {
          console.error(`[one] Error rendering SSR route ${route.file}

${err?.['stack'] ?? err}

url: ${url}`)
        }
      } else {
        const htmlPath = routeMap[url.pathname] || routeMap[buildInfo?.cleanPath]

        if (htmlPath) {
          const html = await FSExtra.readFile(join('dist/client', htmlPath), 'utf-8')
          const headers = new Headers()
          headers.set('content-type', 'text/html')
          return new Response(html, { headers, status: route.isNotFound ? 404 : 200 })
        }
      }
    },
  }

  function createHonoHandler(route: RouteInfoCompiled): MiddlewareHandler<BlankEnv, never, {}> {
    return async (context, next) => {
      try {
        const request = context.req.raw
        const platformContext: PlatformContext = {
          env: context.env as any,
          executionCtx: (context as any).executionCtx,
          requestContext: context,
          cf: (request as any)?.cf,
        }

        if (route.page.endsWith('/+not-found') || Reflect.ownKeys(route.routeKeys).length > 0) {
          // Static assets should have the highest priority - which is the behavior of the dev server.
          // But if we handle every matching static asset here, it seems to break some of the static routes.
          // So we only handle it if there's a matching not-found or dynamic route, to prevent One from taking over the static asset.
          // If there's no matching not-found or dynamic route, it's very likely that One won't handle it and will fallback to VxRN serving the static asset so it will also work.
          const staticAssetResponse = await serveStaticAssets({ context })
          if (staticAssetResponse) {
            return await runMiddlewares(
              requestHandlers,
              request,
              route,
              async () => staticAssetResponse,
              platformContext
            )
          }
        }

        // for js we want to serve our js files directly, as they can match a route on accident
        // middleware my want to handle this eventually as well but for now this is a fine balance
        if (extname(request.url) === '.js' || extname(request.url) === '.css') {
          return next()
        }

        const url = getURLfromRequestURL(request)

        const response = await (() => {
          // this handles the ...rest style routes
          // where to put this best? can likely be after some of the switch?
          if (url.pathname.endsWith(LOADER_JS_POSTFIX_UNCACHED)) {
            const originalUrl = getPathFromLoaderPath(url.pathname)
            const finalUrl = new URL(originalUrl, url.origin)
            return resolveLoaderRoute(
              requestHandlers,
              request,
              finalUrl,
              route,
              platformContext
            )
          }

          switch (route.type) {
            case 'api': {
              return resolveAPIRoute(requestHandlers, request, url, route, platformContext)
            }
            case 'ssg':
            case 'spa':
            case 'ssr': {
              return resolvePageRoute(requestHandlers, request, url, route, platformContext)
            }
          }
        })()

        if (response) {
          if (isResponse(response)) {
            // const cloned = response.clone()

            if (isStatusRedirect(response.status)) {
              const location = `${response.headers.get('location') || ''}`
              response.headers.forEach((value, key) => {
                context.header(key, value)
              })
              return context.redirect(location, response.status)
            }

            if (isAPIRequest.get(request)) {
              try {
                if (
                  !response.headers.has('cache-control') &&
                  !response.headers.has('Cache-Control')
                ) {
                  // don't cache api requests by default
                  response.headers.set('cache-control', 'no-store')
                }
                return response
              } catch (err) {
                console.info(
                  `Error updating cache header on api route "${
                    context.req.path
                  }" to no-store, it is ${response.headers.get('cache-control')}, continue`,
                  err
                )
              }
            }

            return response as Response
          }

          return next()
        }
      } catch (err) {
        console.error(` [one] Error handling request: ${(err as any)['stack']}`)
      }

      return next()
    }
  }

  const compiledManifest = compileManifest(buildInfo.manifest)

  for (const route of compiledManifest.apiRoutes) {
    app.get(route.urlPath, createHonoHandler(route))
    app.put(route.urlPath, createHonoHandler(route))
    app.post(route.urlPath, createHonoHandler(route))
    app.delete(route.urlPath, createHonoHandler(route))
    app.patch(route.urlPath, createHonoHandler(route))

    if (route.urlPath !== route.urlCleanPath) {
      app.get(route.urlCleanPath, createHonoHandler(route))
      app.put(route.urlCleanPath, createHonoHandler(route))
      app.post(route.urlCleanPath, createHonoHandler(route))
      app.delete(route.urlCleanPath, createHonoHandler(route))
      app.patch(route.urlCleanPath, createHonoHandler(route))
    }
  }

  for (const route of compiledManifest.pageRoutes) {
    app.get(route.urlPath, createHonoHandler(route))

    if (route.urlPath !== route.urlCleanPath) {
      app.get(route.urlCleanPath, createHonoHandler(route))
    }
  }

  const { preloads } = buildInfo

  // TODO make this inside each page, need to make loader urls just be REGULAR_URL + loaderpostfix
  app.get('*', async (c, next) => {
    if (c.req.path.endsWith(PRELOAD_JS_POSTFIX)) {
      // TODO handle dynamic segments (i think the below loader has some logic for this)
      if (!preloads[c.req.path]) {
        // no preload exists 200 gracefully
        c.header('Content-Type', 'text/javascript')
        c.status(200)
        return c.body(``)
      }
    }

    if (c.req.path.endsWith(LOADER_JS_POSTFIX_UNCACHED)) {
      const request = c.req.raw
      const url = getURLfromRequestURL(request)
      const originalUrl = getPathFromLoaderPath(c.req.path)

      for (const route of compiledManifest.pageRoutes) {
        if (route.file === '') {
          // ignore not found route
          continue
        }

        if (!route.compiledRegex.test(originalUrl)) {
          continue
        }

        // for now just change this
        const loaderRoute = {
          ...route,
          file: route.loaderServerPath || c.req.path,
        }

        const finalUrl = new URL(originalUrl, url.origin)

        try {
          const resolved = await resolveLoaderRoute(requestHandlers, request, finalUrl, loaderRoute)
          return resolved
        } catch (err) {
          console.error(`Error running loader: ${err}`)
          return next()
        }
      }
    }

    return next()
  })
}
