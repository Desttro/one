import { tamaguiPlugin } from '@tamagui/vite-plugin'
import { one } from 'one/vite'
import type { PluginOption, UserConfig } from 'vite'
import { cloudflare } from '@cloudflare/vite-plugin'

export default {
  // environments: {
  //   one_zero_cf: {
  //     define: {
  //       __APP_VERSION__: JSON.stringify('v1.0.0'),
  //     },
  //   },
  // },
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

    ...(process.env.NODE_ENV === 'production'
      ? ([
          cloudflare(
            //   {
            //   viteEnvironment: {
            //     name: 'ssr',
            //   },
            // }
          ),
        ] as PluginOption[])
      : []),
  ],
} satisfies UserConfig
