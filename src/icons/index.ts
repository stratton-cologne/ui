// src/icons/index.ts
// ---------------------------------------------------------
// Einzell-Exports (tree-shakebar) – nach Kategorien & alphabetisch
// ---------------------------------------------------------

// Theme & System
export { default as Moon } from "./moon";
export { default as Sun } from "./sun";

// Navigation
export { default as ChevronDown } from "./chevron-down";
export { default as ChevronLeft } from "./chevron-left";
export { default as ChevronRight } from "./chevron-right";
export { default as ChevronUp } from "./chevron-up";
export { default as ChevronsDown } from "./chevrons-down";
export { default as ChevronsLeft } from "./chevrons-left";
export { default as ChevronsRight } from "./chevrons-right";
export { default as ChevronsUp } from "./chevrons-up";

export { default as MoveLeft } from "./move-left";
export { default as MoveRight } from "./move-right";
export { default as MoveUp } from "./move-up";
export { default as MoveDown } from "./move-down";
export { default as MoveUpLeft } from "./move-up-left";
export { default as MoveUpRight } from "./move-up-right";
export { default as MoveDownLeft } from "./move-down-left";
export { default as MoveDownRight } from "./move-down-right";

export { default as Home } from "./home";
export { default as HomeAlt } from "./home-alt";
export { default as Menu } from "./menu";
export { default as MenuHero } from "./menu-hero";
export { default as MenuSolid } from "./menu-solid";

// Users
export { default as User } from "./user";
export { default as UserDelete } from "./user-delete";
export { default as Users } from "./users";
export { default as UsersAlt } from "./users-alt";

// Aktionen & UI
export { default as Contact } from "./contact";
export { default as Ellipsis } from "./ellipsis";
export { default as Loader } from "./loader";
export { default as Pencil } from "./pencil";
export { default as Portfolio } from "./portfolio";
export { default as Search } from "./search";
export { default as Settings } from "./settings";
export { default as Share } from "./share";
export { default as Trash } from "./trash";

// Medien & Commerce
export { default as Cart } from "./cart";
export { default as Image } from "./image";
export { default as Images } from "./images";
export { default as LineChart } from "./line-chart";
export { default as Package } from "./package";
export { default as Package2 } from "./package-2";

// Files
export { default as File } from "./file";
export { default as FileArchive } from "./file-archive";
export { default as FileAudio } from "./file-audio";
export { default as FileCode } from "./file-code";
export { default as FileImage } from "./file-image";
export { default as FileJson } from "./file-json";
export { default as FileMarkdown } from "./file-markdown";
export { default as FilePdf } from "./file-pdf";
export { default as FilePresentation } from "./file-presentation";
export { default as FileTable } from "./file-table";
export { default as FileText } from "./file-text";
export { default as FileVideo } from "./file-video";
export { default as FileXml } from "./file-xml";
export { default as Folder } from "./folder";

// Daten/Infra & Sonstiges
export { default as ChartBar } from "./chart-bar";
export { default as Globe } from "./globe";
export { default as Heart } from "./heart";
export { default as MousePointer } from "./mouse-pointer";
export { default as Server } from "./server";
export { default as Timer } from "./timer";
export { default as Copyright } from "./copyright";
export { default as Eye } from "./eye";

export { default as Bell } from "./bell";
export { default as X } from "./x";
// ---------------------------------------------------------
// Default-Map für <Icon name="...">
// – konsistente kebab-case Keys
// – Dateiendungen → passende File-Icons
// ---------------------------------------------------------

import Moon from "./moon";
import Sun from "./sun";

import ChevronDown from "./chevron-down";
import ChevronLeft from "./chevron-left";
import ChevronRight from "./chevron-right";
import ChevronUp from "./chevron-up";
import ChevronsDown from "./chevrons-down";
import ChevronsLeft from "./chevrons-left";
import ChevronsRight from "./chevrons-right";
import ChevronsUp from "./chevrons-up";

import MoveLeft from "./move-left";
import MoveRight from "./move-right";
import MoveUp from "./move-up";
import MoveDown from "./move-down";
import MoveUpLeft from "./move-up-left";
import MoveUpRight from "./move-up-right";
import MoveDownLeft from "./move-down-left";
import MoveDownRight from "./move-down-right";

import Home from "./home";
import HomeAlt from "./home-alt";
import Menu from "./menu";
import MenuHero from "./menu-hero";
import MenuSolid from "./menu-solid";

import User from "./user";
import UserDelete from "./user-delete";
import Users from "./users";
import UsersAlt from "./users-alt";

import Contact from "./contact";
import Ellipsis from "./ellipsis";
import Loader from "./loader";
import Pencil from "./pencil";
import Portfolio from "./portfolio";
import Search from "./search";
import Settings from "./settings";
import Share from "./share";
import Trash from "./trash";

import Cart from "./cart";
import Image from "./image";
import Images from "./images";
import LineChart from "./line-chart";
import Package from "./package";
import Package2 from "./package-2";

import FileIcon from "./file";
import FileArchive from "./file-archive";
import FileAudio from "./file-audio";
import FileCode from "./file-code";
import FileImage from "./file-image";
import FileJson from "./file-json";
import FileMarkdown from "./file-markdown";
import FilePdf from "./file-pdf";
import FilePresentation from "./file-presentation";
import FileTable from "./file-table";
import FileText from "./file-text";
import FileVideo from "./file-video";
import FileXml from "./file-xml";
import Folder from "./folder";

import ChartBar from "./chart-bar";
import Globe from "./globe";
import Heart from "./heart";
import MousePointer from "./mouse-pointer";
import Server from "./server";
import Timer from "./timer";
import Copyright from "./copyright";
import Eye from "./eye";

import Bell from "./bell";

import X from "./x";

const deAliases = {
    // Theme
    sonne: Sun,
    mond: Moon,

    // Menü & Start
    menue: Menu, // "menü" ohne Umlaut im Key
    "menue-hero": MenuHero,
    "menue-solid": MenuSolid,
    start: Home,
    startseite: Home,
    haus: Home,
    "haus-alt": HomeAlt,

    // Benutzer
    benutzer: User,
    nutzer: User,
    profil: User,
    "benutzer-gruppe": Users,
    "nutzer-gruppe": Users,
    gruppe: Users,
    team: Users,
    "benutzer-loeschen": UserDelete,
    "nutzer-loeschen": UserDelete,

    // Aktionen & UI
    suchen: Search,
    suche: Search,
    lupe: Search,
    einstellungen: Settings,
    teilen: Share,
    papierkorb: Trash,
    loeschen: Trash,
    muelleimer: Trash,
    stift: Pencil,
    bearbeiten: Pencil,
    edit: Pencil,
    laden: Loader,
    ladeindikator: Loader,
    mehr: Ellipsis,
    auslassungspunkte: Ellipsis,
    kontakt: Contact,
    adresse: Contact,
    adressbuch: Contact,

    // Medien & Commerce
    warenkorb: Cart,
    einkaufswagen: Cart,
    paket: Package,
    "paket-2": Package2,
    bild: Image,
    bilder: Images,
    galerie: Images,
    "linien-diagramm": LineChart,
    liniendiagramm: LineChart,

    // Daten/Infra & Sonstiges
    balkendiagramm: ChartBar,
    "diagramm-balken": ChartBar,
    globus: Globe,
    welt: Globe,
    weltkugel: Globe,
    stoppuhr: Timer,
    uhr: Timer,
    mauszeiger: MousePointer,
    cursor: MousePointer,
    auge: Eye,
    anzeigen: Eye,
    sichtbar: Eye,
    herz: Heart,
    favorit: Heart,
    like: Heart,
    urheberrecht: Copyright,

    // Dateien / Ordner (generisch)
    datei: FileIcon,
    ordner: Folder,
    verzeichnis: Folder,

    // Dateitypen (sprechende Bezeichnungen)
    "datei-text": FileText,
    textdatei: FileText,
    "datei-bild": FileImage,
    bilddatei: FileImage,
    "datei-audio": FileAudio,
    audiodatei: FileAudio,
    "datei-video": FileVideo,
    videodatei: FileVideo,
    "datei-code": FileCode,
    codedatei: FileCode,
    "datei-tabelle": FileTable,
    tabellendatei: FileTable,
    "datei-praesentation": FilePresentation,
    praesentation: FilePresentation,
    "datei-archiv": FileArchive,
    archivdatei: FileArchive,
    "datei-pdf": FilePdf,
    "pdf-datei": FilePdf,
    "datei-json": FileJson,
    "json-datei": FileJson,
    "datei-xml": FileXml,
    "xml-datei": FileXml,
    "datei-markdown": FileMarkdown,
    "markdown-datei": FileMarkdown,

    // Office-umgangssprachliche Aliasse
    word: FileText,
    excel: FileTable,
    powerpoint: FilePresentation,

    klingel: Bell,
    schließen: X,
    schliessen: X,
    kreuz: X,
    beenden: X,
    ausblenden: X,

    // Arrow (deutsch)
    "pfeil-links": MoveLeft,
    "pfeil-rechts": MoveRight,
    "pfeil-oben": MoveUp,
    "pfeil-unten": MoveDown,
    "pfeil-oben-links": MoveUpLeft,
    "pfeil-oben-rechts": MoveUpRight,
    "pfeil-unten-links": MoveDownLeft,
    "pfeil-unten-rechts": MoveDownRight,
};

export default {
    // Theme & System
    moon: Moon,
    sun: Sun,

    // Navigation
    "chevron-down": ChevronDown,
    "chevron-left": ChevronLeft,
    "chevron-right": ChevronRight,
    "chevron-up": ChevronUp,
    "chevrons-down": ChevronsDown,
    "chevrons-left": ChevronsLeft,
    "chevrons-right": ChevronsRight,
    "chevrons-up": ChevronsUp,
    home: Home,
    "home-alt": HomeAlt,
    menu: Menu,
    "menu-hero": MenuHero,
    "menu-solid": MenuSolid,

    // Users
    user: User,
    "user-delete": UserDelete,
    users: Users,
    "users-alt": UsersAlt,

    // Aktionen & UI
    contact: Contact,
    ellipsis: Ellipsis,
    loader: Loader,
    pencil: Pencil,
    portfolio: Portfolio,
    search: Search,
    settings: Settings,
    share: Share,
    trash: Trash,

    // Medien & Commerce
    cart: Cart,
    image: Image,
    images: Images,
    "line-chart": LineChart,
    package: Package,
    "package-2": Package2,

    // Files (generisch + spezifisch)
    file: FileIcon,
    "file-archive": FileArchive,
    "file-audio": FileAudio,
    "file-code": FileCode,
    "file-image": FileImage,
    "file-json": FileJson,
    "file-markdown": FileMarkdown,
    "file-pdf": FilePdf,
    "file-presentation": FilePresentation,
    "file-table": FileTable,
    "file-text": FileText,
    "file-video": FileVideo,
    "file-xml": FileXml,
    folder: Folder,

    // Daten/Infra & Sonstiges
    "chart-bar": ChartBar,
    globe: Globe,
    heart: Heart,
    "mouse-pointer": MousePointer,
    server: Server,
    timer: Timer,
    copyright: Copyright,
    eye: Eye,

    // Dateiendungs-Aliasse → konkrete File-Icons
    pdf: FilePdf,
    doc: FileText,
    docx: FileText,
    odt: FileText,
    rtf: FileText,
    txt: FileText,
    md: FileMarkdown,
    markdown: FileMarkdown,
    csv: FileTable,
    xls: FileTable,
    xlsx: FileTable,
    ods: FileTable,
    ppt: FilePresentation,
    pptx: FilePresentation,
    odp: FilePresentation,
    jpg: FileImage,
    jpeg: FileImage,
    png: FileImage,
    gif: FileImage,
    webp: FileImage,
    svg: FileImage,
    mp3: FileAudio,
    wav: FileAudio,
    flac: FileAudio,
    mp4: FileVideo,
    mov: FileVideo,
    mkv: FileVideo,
    zip: FileArchive,
    rar: FileArchive,
    "7z": FileArchive,
    tar: FileArchive,
    gz: FileArchive,

    json: FileJson,
    xml: FileXml,
    js: FileCode,
    ts: FileCode,
    jsx: FileCode,
    tsx: FileCode,
    html: FileCode,
    css: FileCode,
    scss: FileCode,
    less: FileCode,

    // (Optional) deutsche Aliasse für Doppel-Chevrons
    "chevron-doppel-down": ChevronsDown,
    "chevron-doppel-left": ChevronsLeft,
    "chevron-doppel-right": ChevronsRight,
    "chevron-doppel-up": ChevronsUp,

    // (Optional) englische Aliasse (falls du beide Varianten willst)
    "chevron-double-down": ChevronsDown,
    "chevron-double-left": ChevronsLeft,
    "chevron-double-right": ChevronsRight,
    "chevron-double-up": ChevronsUp,

    "move-left": MoveLeft,
    "move-right": MoveRight,
    "move-up": MoveUp,
    "move-down": MoveDown,
    "move-up-left": MoveUpLeft,
    "move-up-right": MoveUpRight,
    "move-down-left": MoveDownLeft,
    "move-down-right": MoveDownRight,

    // Arrow Aliasse → zeigen auf die gleichen Move-Icons
    "arrow-left": MoveLeft,
    "arrow-right": MoveRight,
    "arrow-up": MoveUp,
    "arrow-down": MoveDown,
    "arrow-up-left": MoveUpLeft,
    "arrow-up-right": MoveUpRight,
    "arrow-down-left": MoveDownLeft,
    "arrow-down-right": MoveDownRight,

    x: X,
    close: X,
    cross: X,
    X,

    bell: Bell,
    ...deAliases,
};
