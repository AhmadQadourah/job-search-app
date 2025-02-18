import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  components: true,
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@pinia/nuxt", "@nuxtjs/i18n"],
  i18n: {
    locales: [
      { code: "en", file: "en.json" },
      { code: "ar", file: "ar.json" },
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "locales",
    strategy: "no_prefix",
  },
  pinia: {
    autoImports: ["defineStore"],
  },
});
