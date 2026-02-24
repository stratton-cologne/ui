// /src/icons/flags/aliases.ts

/**
 * Mappt gebräuchliche Aliase, Sprach-/Regionscodes und alternative Bezeichnungen
 * auf Flag-Codes (meist ISO-3166-Alpha-2).
 *
 * Hinweis:
 * - Manche Sprachcodes sind mehrdeutig; hier wird auf einen sinnvollen Standard gemappt.
 * - Bei Bedarf kannst du dieses Mapping jederzeit erweitern.
 */
export const FLAG_ALIASES: Record<string, string> = {
    // Regionen/Sonderfälle
    "north korea": "kp",
    "south korea": "kr",
    korea: "kr",
    hk: "hk",
    tw: "tw",
    cn: "cn",
    prc: "cn", // People's Republic of China
    roc: "tw", // Republic of China (Taiwan)
    macau: "mo",
    mo: "mo",

    // Länder (umgangssprachliche Namen)
    usa: "us",
    america: "us",
    uae: "ae",
    emirates: "ae",
    russia: "ru",
    russian: "ru",
    czech: "cz",
    burma: "mm", // Myanmar
    myanmar: "mm",
    laos: "la",
    moldova: "md",
    palestine: "ps",
    syria: "sy",
    vatican: "va",
    ukraine: "ua",

    // Deutschsprachiger Raum
    de: "de",
    de_de: "de",
    at: "at",
    ch: "ch",

    // Englisch-Varianten
    en: "gb",
    en_gb: "gb",
    en_uk: "gb",
    en_ie: "ie",
    en_au: "au",
    en_nz: "nz",
    en_ca: "ca",
    en_us: "us",

    // Spanisch-Varianten
    es: "es",
    es_es: "es",
    es_mx: "mx",
    es_ar: "ar",
    es_cl: "cl",
    es_co: "co",
    es_pe: "pe",

    // Portugiesisch
    pt: "pt",
    pt_pt: "pt",
    pt_br: "br",

    // Französisch
    fr: "fr",
    fr_fr: "fr",
    fr_ca: "ca",

    // Italienisch
    it: "it",
    it_it: "it",

    // Niederländisch
    nl: "nl",
    nl_be: "be",

    // Mittel-/Osteuropa
    pl: "pl",
    cs: "cz",
    sk: "sk",
    sl: "si",
    hr: "hr",
    hu: "hu",
    ro: "ro",
    bg: "bg",

    // Griechisch
    el: "gr",
    gr: "gr",

    // Skandinavien
    sv: "se",
    se: "se",
    da: "dk",
    dk: "dk",
    nb: "no",
    nn: "no",
    no: "no",
    fi: "fi",
    is: "is",

    // Sonstige Europa
    ga: "ie",

    // Baltikum
    et: "ee",
    ee: "ee",
    lv: "lv",
    lt: "lt",

    // Türkei
    tr: "tr",

    // Hebräisch
    he: "il",
    iw: "il",

    // Arabisch/Persisch/Urdu/Kurdisch/Paschtu
    fa: "ir",
    ar: "sa", // alternativ auch 'ae' denkbar – hier Standard Saudi-Arabien
    ur: "pk",
    ps: "af",
    ku: "iq",

    // Südasien (Indien-Subkontinent)
    hi: "in",
    bn: "bd",
    ta: "lk", // Tamil: häufig IN oder LK; hier LK für Sichtbarkeit
    te: "in",
    mr: "in",
    ml: "in",
    kn: "in",
    pa: "pk", // Panjabi/Punjabi kann IN/PK sein; hier PK

    // Süd-/Südostasien
    si: "lk",
    id: "id",
    ms: "my", // Malaiisch -> Malaysia
    vi: "vn",
    th: "th",
    km: "kh", // Khmer -> Kambodscha
    lo: "la", // Lao -> Laos
    my: "mm", // Burmesisch -> Myanmar

    // Chinesisch/Japanisch/Koreanisch
    zh: "cn",
    zh_cn: "cn",
    zh_sg: "sg",
    zh_tw: "tw",
    zh_hk: "hk",
    zh_mo: "mo",
    ja: "jp",
    ko: "kr",

    // Osteuropa/Ehem. UdSSR
    ru: "ru",
    uk: "ua", // Ukrainisch-Sprachcode (ISO 639) vs. Land UK -> hier Ukraine
    be: "by", // Belarussisch -> Belarus
};

/**
 * Normalisiert einen Eingabestring und liefert den passenden Flag-Code,
 * oder – falls kein Alias existiert – den normalisierten Originalwert zurück.
 */
export function resolveFlagAlias(input: string): string {
    const key = input.trim().toLowerCase().replace(/\s+/g, " ");
    return FLAG_ALIASES[key] ?? key;
}
