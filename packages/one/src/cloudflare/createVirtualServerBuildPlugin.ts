import path from 'node:path'
import type { Plugin, UserConfig } from 'vite'
import { normalizePath } from 'vite'
import type { One } from '../vite/types'

const VIRTUAL_ID = 'virtual:one/server-build'
const RESOLVED_VIRTUAL_ID = '\0one-cloudflare-server-build'

export function createVirtualServerBuildPlugin({
  buildInfo,
  projectRoot,
}: {
  buildInfo: One.BuildInfo
  projectRoot: string
}): Plugin {
  return {
    name: 'one:cloudflare-server-build',
    enforce: 'pre',

    config(userConfig, _env) {
      const currentExternal = userConfig.ssr?.external
      const alwaysExternal = ['qrcode-terminal', 'fsevents', 'lightningcss', '@swc/core']

      if (currentExternal === true) {
        return null
      }

      const normalizedExternal: string[] = []

      if (Array.isArray(currentExternal)) {
        normalizedExternal.push(...currentExternal)
      } else if (typeof currentExternal === 'string') {
        normalizedExternal.push(currentExternal)
      }

      for (const pkg of alwaysExternal) {
        if (!normalizedExternal.includes(pkg)) {
          normalizedExternal.push(pkg)
        }
      }

      return {
        ssr: {
          ...userConfig.ssr,
          external: normalizedExternal,
        },
      } satisfies UserConfig
    },

    resolveId(id) {
      if (id === 'qrcode-terminal' || id === 'fsevents' || id === 'lightningcss' || id === '@swc/core') {
        return { id, external: true }
      }
      if (id === VIRTUAL_ID) {
        return RESOLVED_VIRTUAL_ID
      }
    },

    load(id) {
      if (id !== RESOLVED_VIRTUAL_ID) {
        return
      }

      return generateModuleCode(buildInfo, projectRoot)
    },
  }
}

function generateModuleCode(buildInfo: One.BuildInfo, projectRoot: string) {
  const imports: string[] = []
  const routeModuleEntries: string[] = []
  const apiModuleEntries: string[] = []
  const middlewareEntries: string[] = []

  let importIndex = 0

  for (const [routeFile, info] of Object.entries(buildInfo.routeToBuildInfo || {})) {
    if (!info?.serverJsPath) continue
    const importName = `routeModule_${importIndex++}`
    imports.push(`import * as ${importName} from ${JSON.stringify(resolvePath(projectRoot, info.serverJsPath))};`)
    routeModuleEntries.push(`${JSON.stringify(routeFile)}: ${importName}`)
  }

  const apiRoutes = buildInfo.apiRouteModules || {}
  for (const [routeFile, modulePath] of Object.entries(apiRoutes)) {
    if (!modulePath) continue
    const importName = `apiModule_${importIndex++}`
    imports.push(`import * as ${importName} from ${JSON.stringify(resolvePath(projectRoot, modulePath))};`)
    apiModuleEntries.push(`${JSON.stringify(routeFile)}: ${importName}`)
  }

  const middlewarePaths = new Set<string>()
  for (const route of buildInfo.manifest.allRoutes || []) {
    for (const middleware of route.middlewares || []) {
      if (typeof middleware.contextKey === 'string') {
        middlewarePaths.add(middleware.contextKey)
      }
    }
  }

  for (const contextKey of middlewarePaths) {
    const importName = `middlewareModule_${importIndex++}`
    imports.push(`import ${importName} from ${JSON.stringify(resolvePath(projectRoot, contextKey))};`)
    middlewareEntries.push(`${JSON.stringify(contextKey)}: ${importName}`)
  }

  const buildInfoJSON = JSON.stringify(buildInfo)

  return `
${imports.join('\n')}

export const buildInfo = ${buildInfoJSON};
export const routeModules = {${routeModuleEntries.join(',')}};
export const apiModules = {${apiModuleEntries.join(',')}};
export const middlewareModules = {${middlewareEntries.join(',')}};

export default { buildInfo, routeModules, apiModules, middlewareModules };
`
}

function resolvePath(projectRoot: string, target: string) {
  return normalizePath(path.resolve(projectRoot, target))
}
