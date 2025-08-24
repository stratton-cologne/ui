import { getCurrentInstance, ref } from "vue";

/**
 * Erzeugt eine stabile Basis-ID je Komponent-Instanz.
 * Verwendung: const makeId = useStableId('tab-panel'); makeId('tab-home')
 */
export function useStableId(prefix = "sc") {
    const inst = getCurrentInstance();
    const base = ref(
        `${prefix}-${inst?.uid ?? Math.random().toString(36).slice(2)}`
    );
    return (suffix?: string) =>
        suffix ? `${base.value}-${suffix}` : base.value;
}
