#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const entries = path.join(dist, "entries");

if (!fs.existsSync(entries)) {
    console.log("[flatten-dts] no dist/entries folder, nothing to do.");
    process.exit(0);
}

for (const f of fs.readdirSync(entries)) {
    if (!f.endsWith(".d.ts")) continue;
    const src = path.join(entries, f);
    const dst = path.join(dist, f); // -> dist/<name>.d.ts
    fs.copyFileSync(src, dst);
    // optional: SourceMap/inline refs kannst du hier noch anpassen, i. d. R. nicht nötig
    console.log(
        `[flatten-dts] ${path.relative(process.cwd(), src)} -> ${path.relative(
            process.cwd(),
            dst
        )}`
    );
}
