// https://nuxt.com/docs/api/configuration/nuxt-config
import {process} from "std-env";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt',],
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_API_URL,
        }
    },
    ssr: false
})