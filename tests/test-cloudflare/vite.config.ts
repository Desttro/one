import { cloudflare } from '@cloudflare/vite-plugin'
import { one } from 'one/vite'
import type { UserConfig } from 'vite'

export default {
  plugins: [
    one({
      web: {
        deploy: 'cloudflare',
      },
    }),
    ...(process.env.ONE_CLOUDFLARE_PLUGIN ? [cloudflare()] : []),
  ],
} satisfies UserConfig
