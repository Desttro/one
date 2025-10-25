import { createBuilder } from 'vite'
import type { One } from '../vite/types'
import { createVirtualServerBuildPlugin } from './createVirtualServerBuildPlugin'

export async function buildCloudflareWorker({
  buildInfo,
  projectRoot,
  postBuildLogs,
}: {
  buildInfo: One.BuildInfo
  projectRoot: string
  postBuildLogs: string[]
}) {
  let builder
  const previousFlag = process.env.ONE_CLOUDFLARE_PLUGIN
  process.env.ONE_CLOUDFLARE_PLUGIN = '1'
  try {
    builder = await createBuilder({
      root: projectRoot,
      mode: 'production',
      plugins: [createVirtualServerBuildPlugin({ buildInfo, projectRoot })],
    })
  } catch (err) {
    console.error('[one.build][cloudflare] failed to initialize cloudflare builder')
    throw err
  } finally {
    if (previousFlag === undefined) {
      delete process.env.ONE_CLOUDFLARE_PLUGIN
    } else {
      process.env.ONE_CLOUDFLARE_PLUGIN = previousFlag
    }
  }

  if (process.env.ONE_DEBUG_CLOUDFLARE) {
    console.info('[one.build][cloudflare] environments', Object.keys(builder.environments || {}))
  }

  const hasCloudflarePlugin = builder.config.plugins?.some((plugin) => {
    return Boolean(plugin && 'name' in plugin && plugin?.name === 'vite-plugin-cloudflare')
  })

  if (!hasCloudflarePlugin) {
    console.warn(
      '[one.build] web.deploy is "cloudflare" but @cloudflare/vite-plugin is not configured in vite.config.ts. Skipping worker build.'
    )
    return
  }

  try {
    await builder.buildApp()
  } catch (err) {
    console.error('[one.build][cloudflare] buildApp failed')
    throw err
  }

  postBuildLogs.push(`[one.build][cloudflare] worker build complete`)
}
