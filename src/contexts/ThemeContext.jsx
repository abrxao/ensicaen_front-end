import { useState, useEffect } from "react";
import { ThemeContext } from "src/hooks/useTheme";

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "system"
  );

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
