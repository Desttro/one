import { tamaguiPlugin } from '@tamagui/vite-plugin'
import { one } from 'one/vite'
import type { PluginOption, UserConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'

export default {
  plugins: [
    one({
      web: {
        defaultRenderMode: 'spa',
        // deploy: 'cloudflare',
        deploy: 'node',
      },
    }),

    tamaguiPlugin({
      optimize: process.env.NODE_ENV === 'production',
      components: ['tamagui'],
      config: './src/tamagui/tamagui.config.ts',
      outputCSS: './src/tamagui/tamagui.css',
    }),

    // cloudflare({ viteEnvironment: { name: 'ssr' } }),
    // cloudflare(),

    ...(process.env.NODE_ENV === 'production'
      ? ([
          cloudflare({
            viteEnvironment: {
              name: 'ssr',
            },
          }),
        ] as PluginOption[])
      : []),
  ],

  environments: {
    ssr: {
      // Volitelně: Definuj globals pro Worker env, např. verzi app
      define: {
        __APP_VERSION__: JSON.stringify('1.0.0'),
      },
    },
  },
} satisfies UserConfig
