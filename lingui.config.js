import { defineConfig } from "@lingui/cli";

export default defineConfig({
  sourceLocale: "fr",
  locales: ["fr", "en"],
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
});
