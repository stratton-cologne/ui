import { ref } from "vue";

export interface TabLike {
    key: string;
    disabled?: boolean;
}

export function useTablistNav<T extends TabLike>(
    getTabs: () => T[],
    getActiveKey: () => string,
    onSelect: (key: string) => void
) {
    const tablistRef = ref<HTMLElement | null>(null);
    const itemRefs = new Map<string, HTMLButtonElement | null>();

    const setItemRef = (key: string, el: HTMLButtonElement | null) => {
        itemRefs.set(key, el);
    };

    const enabledKeys = () =>
        getTabs()
            .filter((t) => !t.disabled)
            .map((t) => t.key);

    const focusItem = (key: string) => {
        const el = itemRefs.get(key) || null;
        el?.focus();
    };

    const move = (dir: 1 | -1) => {
        const keys = enabledKeys();
        if (!keys.length) return;
        const cur = getActiveKey();
        const idx = Math.max(0, keys.indexOf(cur));
        const next = keys[(idx + dir + keys.length) % keys.length];
        focusItem(next);
        onSelect(next);
    };

    const onKeydown = (e: KeyboardEvent) => {
        switch (e.key) {
            case "ArrowRight":
            case "ArrowDown":
                e.preventDefault();
                move(1);
                break;
            case "ArrowLeft":
            case "ArrowUp":
                e.preventDefault();
                move(-1);
                break;
            case "Home": {
                e.preventDefault();
                const first = enabledKeys()[0];
                if (first) {
                    focusItem(first);
                    onSelect(first);
                }
                break;
            }
            case "End": {
                e.preventDefault();
                const keys = enabledKeys();
                const last = keys[keys.length - 1];
                if (last) {
                    focusItem(last);
                    onSelect(last);
                }
                break;
            }
            case "Enter":
            case " ": {
                e.preventDefault();
                const el = e.target as HTMLElement | null;
                // Button click auslösen
                el?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
                break;
            }
        }
    };

    return { tablistRef, setItemRef, focusItem, onKeydown };
}
