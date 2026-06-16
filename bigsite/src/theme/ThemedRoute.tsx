import { useSyncExternalStore, type ComponentType } from "react";

// Theme-conditional page implementations: when a theme is active, a route can
// render a structurally different page (radical per-theme redesign), falling
// back to the base component otherwise. Reactive to the ThemeSwitch event;
// useSyncExternalStore re-checks the snapshot when subscribing, which also
// covers the sibling-effect race on first load (?theme= / localStorage).

function subscribe(cb: () => void) {
  window.addEventListener("wtp-theme", cb);
  return () => window.removeEventListener("wtp-theme", cb);
}

function getSnapshot(): string {
  return document.documentElement.dataset.theme ?? "base";
}

export function useThemeId(): string {
  return useSyncExternalStore(subscribe, getSnapshot, () => "base");
}

type ThemeImpls = Partial<Record<"v1" | "v2" | "v3", ComponentType>>;

export function themed(Base: ComponentType, impls: ThemeImpls) {
  return function ThemedPage() {
    const t = useThemeId();
    const Impl = (impls as Record<string, ComponentType | undefined>)[t] ?? Base;
    return <Impl />;
  };
}
