import { createContext, useContext, useEffect, useState, useCallback } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

const STORAGE_KEY = "fundflow-theme";

const applyTheme = (theme) => {
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  console.debug("[Theme] applyTheme called:", { theme, prefersDark, currentClasses: root.className });

  if (theme === "dark") {
    root.classList.add("dark");
  } else if (theme === "light") {
    root.classList.remove("dark");
  } else {
    // system
    if (prefersDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }

  console.debug("[Theme] After apply:", { hasDarkClass: root.classList.contains("dark"), classes: root.className });
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    let saved;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      saved = null;
    }
    console.debug("[Theme] Init — localStorage value:", JSON.stringify(saved), "→ using:", saved || "system");
    return saved || "system";
  });

  const setTheme = useCallback((newTheme) => {
    console.debug("[Theme] setTheme called:", newTheme);
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
      console.debug("[Theme] Saved to localStorage:", newTheme);
    } catch (e) {
      console.debug("[Theme] localStorage save failed:", e);
    }
    applyTheme(newTheme);
  }, []);

  // Apply theme on mount and when theme changes
  useEffect(() => {
    console.debug("[Theme] useEffect — applying theme:", theme);
    applyTheme(theme);
  }, [theme]);

  // Listen for system theme changes when in "system" mode
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      console.debug("[Theme] System preference changed. Current theme:", theme, "prefersDark:", mql.matches);
      if (theme === "system") {
        applyTheme("system");
      }
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [theme]);

  const isDark =
    theme === "dark" ||
    (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  console.debug("[Theme] Render — theme:", theme, "isDark:", isDark);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
