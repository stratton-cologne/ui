// vite.umd.config.mjs
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// UMD-Build: nur EIN Eintrag (index)
export default {
    plugins: [vue()],
    build: {
        target: "esnext",
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "StrattonCologneUI",
            fileName: "index.umd",
            formats: ["umd"],
        },
        rollupOptions: {
            external: ["vue", "vue-router", "vue-i18n"],
            output: {
                globals: {
                    vue: "Vue",
                    "vue-router": "VueRouter",
                    "vue-i18n": "VueI18n",
                },
            },
        },
    },
};
