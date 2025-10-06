import { useTheme } from "/src/contexts/ThemeContext";
import { Trans } from "@lingui/react/macro";
import { ChevronsDown } from "lucide-react";
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
          💻 <Trans>Sistéme</Trans>
        </option>
        <option value="light">
          ☀️ <Trans>Clair</Trans>
        </option>
        <option value="dark">
          🌙 <Trans>Noir</Trans>
        </option>
      </select>
      <ChevronsDown className="switcher-icon" size={20} />
    </div>
  );
}
