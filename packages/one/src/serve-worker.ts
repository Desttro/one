import { Hono } from 'hono'
import { oneServe, type ModuleLoaders } from './server/oneServe'
import { setServerGlobals } from './server/setServerGlobals'
import { setupBuildInfo } from './server/setupBuildOptions'
import { ensureExists } from './utils/ensureExists'
import type { One } from './vite/types'

type ServeWorkerOptions = {
  disableStaticServer?: boolean
  moduleLoaders?: ModuleLoaders
}

export async function serve(buildInfo: One.BuildInfo, options: ServeWorkerOptions = {}) {
  setupBuildInfo(buildInfo)
  ensureExists(buildInfo.oneOptions)
  setServerGlobals()

  const serverOptions = buildInfo.oneOptions.server || {}

  const app = new Hono()

  if (!options.disableStaticServer) {
    const { createProdServer } = await import('vxrn/serve')
    await createProdServer(app, serverOptions)
  }

  await oneServe(buildInfo.oneOptions, buildInfo, app, options.moduleLoaders)

  return app
}
