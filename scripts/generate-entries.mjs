#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/* Paths */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const componentsDir = path.join(root, "src/components");
const entriesDir = path.join(root, "src/entries");
const mapFile = path.join(root, "entries.map.json");

/* Utils */
const kebab = (s) =>
    s
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/\s+/g, "-")
        .replace(/_/g, "-")
        .toLowerCase();

const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};
const ensureParentDir = (filePath) => ensureDir(path.dirname(filePath));
const readMap = () =>
    fs.existsSync(mapFile) ? JSON.parse(fs.readFileSync(mapFile, "utf8")) : {};

/* Scan */
const getComponents = () =>
    fs.existsSync(componentsDir)
        ? fs.readdirSync(componentsDir).filter((f) => f.endsWith(".vue"))
        : [];

/* Alias map (nur Komponenten) */
function buildComponentsAliasMap() {
    const aliases = readMap(); // z.B. { "theme-switcher": "ThemeToggle.vue" }
    for (const f of getComponents()) {
        const base = f.replace(/\.vue$/i, "");
        const alias = kebab(base);
        if (!Object.values(aliases).includes(f) && !aliases[alias]) {
            aliases[alias] = f;
        }
    }
    return aliases;
}

/* Entries/** /*.ts rekursiv löschen */
function cleanEntriesTs(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        const stat = fs.lstatSync(full);
        if (stat.isDirectory()) {
            cleanEntriesTs(full);
            if (fs.readdirSync(full).length === 0) fs.rmdirSync(full);
        } else if (entry.endsWith(".ts")) {
            fs.unlinkSync(full);
        }
    }
}

/* Writer (Komponenten) */
function writeComponentEntry(alias, file) {
    const base = file.replace(/\.vue$/i, "");
    const ident =
        base.replace(/[^a-zA-Z0-9_$]/g, "_").replace(/^(\d)/, "_$1") || "Comp";

    const src =
        `import ${ident} from '../components/${file}'\n` +
        `export default ${ident}\n`;
    const outPath = path.join(entriesDir, `${alias}.ts`);
    ensureParentDir(outPath);
    fs.writeFileSync(outPath, src, "utf8");
}

/* Main */
ensureDir(entriesDir);
cleanEntriesTs(entriesDir);

const compAliases = buildComponentsAliasMap();

for (const [alias, file] of Object.entries(compAliases).sort()) {
    writeComponentEntry(alias, file);
}

console.log("[sc/ui] Generated entries:");
for (const [alias, file] of Object.entries(compAliases)) {
    console.log(`  ./${alias} -> components/${file}`);
}
console.log("  (icons werden direkt als Rollup-Inputs gebaut)");
