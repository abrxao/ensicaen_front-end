import { useState, useEffect } from "react";
import { createContext, useContext } from "react";

export const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    localStorage.getItem("theme") || "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (newTheme) => {
      const systemIsDark = isDark.matches;

      if (newTheme === "dark" || (newTheme === "system" && systemIsDark)) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme(theme);

    localStorage.setItem("theme", theme);

    const handleSystemThemeChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    isDark.addEventListener("change", handleSystemThemeChange);

    return () => {
      isDark.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
