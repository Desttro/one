import type { ModuleLoaders } from '../server/oneServe'
import { serve } from '../serve-worker'
import type { One } from '../vite/types'

type LoadServerBuild = () => Promise<CloudflareServerBuild> | CloudflareServerBuild

export type CloudflareServerBuild = {
  buildInfo: One.BuildInfo
  routeModules: Record<string, any>
  apiModules: Record<string, any>
  middlewareModules: Record<string, any>
}

export function createRequestHandler(loadServerBuild: LoadServerBuild) {
  let appPromise: Promise<Awaited<ReturnType<typeof serve>>> | null = null

  async function getApp() {
    if (!appPromise) {
      appPromise = (async () => {
        const serverBuild = await loadServerBuild()
        const moduleLoaders: ModuleLoaders = {
          loadRouteModule: async (route) => {
            const mod = serverBuild.routeModules?.[route.file]
            if (!mod) {
              throw new Error(`Missing server module for route "${route.file}"`)
            }
            return mod
          },
          loadAPIModule: async (route) => {
            const mod = serverBuild.apiModules?.[route.file]
            if (!mod) {
              throw new Error(`Missing API module for route "${route.file}"`)
            }
            return mod
          },
          loadMiddlewareModule: async (contextKey) => {
            const mod = serverBuild.middlewareModules?.[contextKey]
            if (!mod) {
              throw new Error(`Missing middleware module for "${contextKey}"`)
            }
            return mod
          },
        }

        return await serve(serverBuild.buildInfo, {
          disableStaticServer: true,
          moduleLoaders,
        })
      })()
    }

    return appPromise
  }

  return async function handleFetch(request: Request, env?: unknown, ctx?: unknown) {
    const app = await getApp()
    return app.fetch(request, env as any, ctx as any)
  }
}
