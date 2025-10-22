import { tamaguiPlugin } from '@tamagui/vite-plugin'
import { one } from 'one/vite'
import type { UserConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'

export default {
  plugins: [
    one({
      web: {
        defaultRenderMode: 'spa',
        // deploy: 'vercel',
      },
    }),

    tamaguiPlugin({
      optimize: process.env.NODE_ENV === 'production',
      components: ['tamagui'],
      config: './src/tamagui/tamagui.config.ts',
      outputCSS: './src/tamagui/tamagui.css',
    }),

    // cloudflare({ viteEnvironment: { name: 'ssr' } }),
    cloudflare(),
  ],
} satisfies UserConfig
