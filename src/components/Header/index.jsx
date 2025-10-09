import { Trans } from "@lingui/react/macro";
import DropDownLangue from "/src/components/DropDownLangue/DropDownLangue";
import { ThemeSwitcher } from "/src/components/ThemeSwitcher/ThemeSwitcher";
import NavigationMenu from "/src/components/NavigationMenu";
import { PackageCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="main-header">
      <div className="groups-header">
        <PackageCheck size={32} />
        <h1>
          <Trans>Pour faire</Trans>
        </h1>
      </div>

      <NavigationMenu />
      <div className="groups-header">
        <DropDownLangue />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
