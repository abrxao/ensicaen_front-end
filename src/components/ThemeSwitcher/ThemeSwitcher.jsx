import { Trans, useLingui } from "@lingui/react/macro";
import DropDown, { Option } from "../ui/DropDown";
import useTheme from "src/hooks/useTheme";

export function ThemeSwitcher() {
  // Pega o tema atual e a função para alterá-lo do contexto
  const { theme, setTheme } = useTheme();
  const { t } = useLingui();
  const ariaLabelTheme = t`bouton pour changer le theme`;
  // Função para lidar com a mudança de valor no dropdown
  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <DropDown
      aria-label={ariaLabelTheme}
      onChange={handleThemeChange}
      value={theme}
    >
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
