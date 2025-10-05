import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@lingui/vite-plugin";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["@lingui/babel-plugin-lingui-macro"],
      },
    }),
    lingui(),
    viteCommonjs(),
  ],
  resolve: {
    alias: {
      src: "/src",
    },
  },
});
