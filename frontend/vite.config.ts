import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig, RollupCommonJSOptions } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    commonjsOptions: {
      defaultIsModuleExports(id) {
        try {
          const module = require(id)
          if (module?.default) {
            return false
          }
          return 'auto'
        } catch (error) {
          return 'auto'
        }
      },
      transformMixedEsModules: true,
    } as RollupCommonJSOptions,
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
})
