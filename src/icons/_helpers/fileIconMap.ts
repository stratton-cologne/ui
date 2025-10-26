// src/components/icons/_helpers/fileIconMap.ts
export function iconNameByExtension(extRaw?: string): string {
    const ext = (extRaw || "").toLowerCase().replace(/^\./, "");

    const map: Record<string, string> = {
        pdf: "file-pdf",
        doc: "file-text",
        docx: "file-text",
        odt: "file-text",
        rtf: "file-text",
        txt: "file-text",
        md: "file-markdown",
        markdown: "file-markdown",
        csv: "file-table",
        xls: "file-table",
        xlsx: "file-table",
        ods: "file-table",
        ppt: "file-presentation",
        pptx: "file-presentation",
        odp: "file-presentation",
        jpg: "file-image",
        jpeg: "file-image",
        png: "file-image",
        gif: "file-image",
        webp: "file-image",
        svg: "file-image",
        mp3: "file-audio",
        wav: "file-audio",
        flac: "file-audio",
        mp4: "file-video",
        mov: "file-video",
        mkv: "file-video",
        zip: "file-archive",
        rar: "file-archive",
        "7z": "file-archive",
        tar: "file-archive",
        gz: "file-archive",
        json: "file-json",
        xml: "file-xml",
        js: "file-code",
        ts: "file-code",
        jsx: "file-code",
        tsx: "file-code",
        html: "file-code",
        css: "file-code",
        scss: "file-code",
        less: "file-code",
    };

    return map[ext] || "file";
}

export function iconNameByMime(mime?: string): string {
    const m = (mime || "").toLowerCase();
    if (m.startsWith("image/")) return "file-image";
    if (m.startsWith("audio/")) return "file-audio";
    if (m.startsWith("video/")) return "file-video";
    if (m === "application/pdf") return "file-pdf";
    if (m.includes("spreadsheet") || m.includes("excel")) return "file-table";
    if (m.includes("presentation") || m.includes("powerpoint"))
        return "file-presentation";
    if (
        m.includes("zip") ||
        m.includes("rar") ||
        m.includes("7z") ||
        m.includes("tar") ||
        m.includes("gzip")
    )
        return "file-archive";
    if (m.includes("json")) return "file-json";
    if (m.includes("xml")) return "file-xml";
    if (
        m.includes("javascript") ||
        m.includes("typescript") ||
        m.includes("html") ||
        m.includes("css")
    )
        return "file-code";
    if (m.startsWith("text/")) return "file-text";
    return "file";
}
