import { useTheme } from "/src/contexts/ThemeContext";
import { Trans } from "@lingui/react/macro";
import { ChevronsDown, Computer, Moon, Sun } from "lucide-react";
import "./ThemeSwitcher.css";

export function ThemeSwitcher() {
  // Pega o tema atual e a função para alterá-lo do contexto
  const { theme, setTheme } = useTheme();

  // Função para lidar com a mudança de valor no dropdown
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="dropdown-switcher">
      <label htmlFor="theme-select" className="switcher-label">
        <Trans>Theme:</Trans>
      </label>
      <select id="theme-select" value={theme} onChange={handleThemeChange}>
        <option value="system">
          <Computer size={12} /> <Trans>Sistéme</Trans>
        </option>
        <option value="light">
          <Sun /> <Trans>Clair</Trans>
        </option>
        <option value="dark">
          <Moon /> <Trans>Noir</Trans>
        </option>
      </select>
      <ChevronsDown className="switcher-icon" size={20} />
    </div>
  );
}
