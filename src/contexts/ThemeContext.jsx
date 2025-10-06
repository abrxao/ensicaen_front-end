import { createContext, useContext, useState, useEffect } from "react";

// 1. Cria o contexto
const ThemeContext = createContext();

// 2. Cria o provedor do contexto
export function ThemeProvider({ children }) {
  // Lê o tema do localStorage ou define 'system' como padrão
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "system"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = window.matchMedia("(prefers-color-scheme: dark)");

    // Função para aplicar o tema correto
    const applyTheme = (newTheme) => {
      const systemIsDark = isDark.matches;

      if (newTheme === "dark" || (newTheme === "system" && systemIsDark)) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    // Aplica o tema quando o estado 'theme' muda
    applyTheme(theme);

    // Salva a preferência no localStorage
    localStorage.setItem("theme", theme);

    // Ouve mudanças na preferência do sistema
    const handleSystemThemeChange = (e) => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    isDark.addEventListener("change", handleSystemThemeChange);

    // Limpeza do efeito
    return () => {
      isDark.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]); // Roda o efeito sempre que o tema mudar

  const value = { theme, setTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// 3. Cria um hook customizado para usar o contexto facilmente
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
