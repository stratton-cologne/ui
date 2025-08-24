import vue from "@vitejs/plugin-vue";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getInputs() {
    const entriesDir = path.resolve(__dirname, "src/entries");
    const inputs = { index: path.resolve(__dirname, "src/index.ts") };
    if (fs.existsSync(entriesDir)) {
        for (const file of fs.readdirSync(entriesDir)) {
            if (file.endsWith(".ts")) {
                inputs[file.replace(/\.ts$/, "")] = path.join(entriesDir, file);
            }
        }
    }
    return inputs;
}

// NEW: Icons direkt als Rollup-Inputs (kein entries-Proxy nötig)
function getIconInputs() {
    const dir = path.resolve(__dirname, "src/icons");
    const inputs = {};
    if (fs.existsSync(dir)) {
        for (const f of fs.readdirSync(dir)) {
            if (f.endsWith(".ts") && f !== "index.ts" && !f.startsWith("_")) {
                const name = f.replace(/\.ts$/i, "");
                inputs[`icons/${name}`] = path.join(dir, f);
            }
        }
    }
    return inputs;
}

// ES-Build (Multi-Entry)
const esConfig = {
    plugins: [vue()],
    build: {
        target: "esnext",
        sourcemap: true,
        emptyOutDir: false, // .d.ts aus build:types nicht löschen
        rollupOptions: {
            input: { ...getInputs(), ...getIconInputs() },
            external: ["vue", "vue-router", "vue-i18n"],
            // WICHTIG: preserveEntrySignatures top-level setzen (nicht im output)
            preserveEntrySignatures: "strict",
            output: {
                format: "es",
                dir: "dist",
                entryFileNames: "[name].es.js",
                chunkFileNames: "chunks/[name]-[hash].js",
                exports: "named",
                preserveModules: true,
                // optional, hält Pfade sauber (ändert nur Ordnerstruktur):
                // preserveModulesRoot: "src",
            },
            // Zum Verifizieren auf false lassen; wenn alles okay: wieder true
            treeshake: false,
        },
    },
};

// UMD-Build (nur index)
const umdConfig = {
    plugins: [vue()],
    build: {
        target: "esnext",
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "StrattonCologneUI",
            // sorgt für dist/index.umd.cjs (passt zu "main")
            fileName: "index",
            formats: ["umd"],
        },
        // ESM-Output nicht überschreiben
        emptyOutDir: false,
        rollupOptions: {
            external: ["vue", "vue-router", "vue-i18n"],
            output: {
                exports: "named",
                globals: {
                    vue: "Vue",
                    "vue-router": "VueRouter",
                    "vue-i18n": "VueI18n",
                },
            },
        },
    },
};

export default ({ mode }) => (mode === "umd" ? umdConfig : esConfig);
