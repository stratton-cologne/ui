import { ref, computed, watchEffect } from "vue";

type Theme = "light" | "dark";
const STORAGE_KEY = "app.theme";
const isClient =
    typeof window !== "undefined" && typeof document !== "undefined";

function loadInitialTheme(): Theme {
    if (!isClient) return "light";
    const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

const themeRef = ref<Theme>(loadInitialTheme());

function applyTheme(t: Theme) {
    if (!isClient) return;
    const root = document.documentElement;
    root.setAttribute("data-theme", t);
    root.classList.toggle("dark", t === "dark");
    try {
        window.localStorage.setItem(STORAGE_KEY, t);
    } catch {}
}

watchEffect(() => applyTheme(themeRef.value));

export function useTheme() {
    const theme = computed(() => themeRef.value);
    const isDark = computed(() => themeRef.value === "dark");
    function setTheme(t: Theme) {
        themeRef.value = t;
    }
    function toggleTheme() {
        themeRef.value = themeRef.value === "dark" ? "light" : "dark";
    }
    return { theme, isDark, setTheme, toggleTheme };
}
