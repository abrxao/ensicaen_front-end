import { useTheme } from "/src/contexts/ThemeContext";
import { Trans } from "@lingui/react/macro";
import { ChevronsDown, Computer, Moon, Sun } from "lucide-react";
import DropDown, { Option } from "../ui/DropDown";

export function ThemeSwitcher() {
  // Pega o tema atual e a função para alterá-lo do contexto
  const { theme, setTheme } = useTheme();

  // Função para lidar com a mudança de valor no dropdown
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <DropDown onChange={handleThemeChange} value={theme}>
      <Option value="system">
        <Computer size={12} /> <Trans>Sistéme</Trans>
      </Option>
      <Option value="light">
        <Sun /> <Trans>Clair</Trans>
      </Option>
      <Option value="dark">
        <Moon /> <Trans>Noir</Trans>
      </Option>
    </DropDown>
  );
}
