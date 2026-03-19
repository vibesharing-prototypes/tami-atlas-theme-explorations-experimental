import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type AtlasTokenMode = "atlas-light" | "atlas-dark";

export type ThemeVariant = "light" | "dark" | "atlas-corporate" | "horizon" | "midnight" | "obsidian";

export const BASE_VARIANTS: { id: ThemeVariant; label: string; base: AtlasTokenMode }[] = [
  { id: "light", label: "Light", base: "atlas-light" },
  { id: "dark", label: "Dark", base: "atlas-dark" },
];

export const NAMED_VARIANTS: { id: ThemeVariant; label: string; base: AtlasTokenMode }[] = [
  { id: "atlas-corporate", label: "Atlas Corporate", base: "atlas-light" },
  { id: "horizon", label: "Horizon", base: "atlas-light" },
  { id: "midnight", label: "Midnight", base: "atlas-dark" },
  { id: "obsidian", label: "Obsidian", base: "atlas-dark" },
];

export const THEME_VARIANTS = [...BASE_VARIANTS, ...NAMED_VARIANTS];

export function getBaseTokenMode(variant: ThemeVariant): AtlasTokenMode {
  const found = THEME_VARIANTS.find((t) => t.id === variant);
  return found?.base ?? "atlas-light";
}

const STORAGE_KEY = "atlas-theme-variant";

function getStoredVariant(): ThemeVariant {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (THEME_VARIANTS.some((t) => t.id === stored)) return stored as ThemeVariant;
  return "dark";
}

type ThemeContextValue = {
  themeVariant: ThemeVariant;
  setThemeVariant: (variant: ThemeVariant) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeVariant, setThemeVariantState] = useState<ThemeVariant>(getStoredVariant);

  const setThemeVariant = useCallback((variant: ThemeVariant) => {
    setThemeVariantState(variant);
    localStorage.setItem(STORAGE_KEY, variant);
    document.documentElement.dataset.theme = variant;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = themeVariant;
  }, [themeVariant]);

  useEffect(() => {
    const handler = (e: Event) => {
      const theme = (e as CustomEvent<{ theme: string }>).detail.theme;
      if (THEME_VARIANTS.some((t) => t.id === theme)) {
        setThemeVariant(theme as ThemeVariant);
      }
    };
    document.addEventListener("proto:theme", handler);
    return () => document.removeEventListener("proto:theme", handler);
  }, [setThemeVariant]);

  const value = useMemo(() => ({ themeVariant, setThemeVariant }), [themeVariant, setThemeVariant]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeMode must be used within ThemeProvider");
  return ctx;
}