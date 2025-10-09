import { useTheme } from "/src/contexts/ThemeContext";
import { Trans } from "@lingui/react/macro";
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
        💻 <Trans>Sistéme</Trans>
      </Option>
      <Option value="light">
        ☀️ <Trans>Clair</Trans>
      </Option>
      <Option value="dark">
        🌒 <Trans>Noir</Trans>
      </Option>
    </DropDown>
  );
}
