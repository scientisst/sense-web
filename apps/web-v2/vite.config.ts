import react from "@vitejs/plugin-react-swc";
import ssr from "vike/plugin";
import { defineConfig } from "vite";

import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  cacheDir: process.env.CACHE_DIR ?? "node_modules/.vite",
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkGfm],
        providerImportSource: "@mdx-js/react",
      }),
    },
    react(),
    ViteImageOptimizer({
      webp: {
        quality: 50,
        alphaQuality: 100,
        lossless: false,
        nearLossless: false,
        effort: 6,
      },
      jpg: {
        mozjpeg: true,
      },
      jpeg: {
        mozjpeg: true,
      },
      logStats: true,
    }),
    svgr({
      svgrOptions: {
        icon: true,
        dimensions: false,
      },
    }),
    ssr({ prerender: true }),
  ],
  ssr: {
    noExternal: ["react-particles", "tsparticles-engine"],
  },
  esbuild: {
    legalComments: "none",
  },
  optimizeDeps: {
    exclude: ["@mdx-js/react"],
  },
});
