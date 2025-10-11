import { NavLink } from "react-router";
import { PATHS } from "/src/paths";
import { CheckCircle, HomeIcon } from "lucide-react";
import { useLocation } from "react-router";
import { useLingui } from "@lingui/react/macro";

export default function NavigationMenu({ children, ...props }) {
  const location = useLocation();
  const { t } = useLingui();
  const ariaLabelHome = t`cliquez pour aller à la page d'accueil`;
  const ariaLabelTasks = t`cliquez pour aller à la page des tâches`;
  return (
    <nav className="navigation-menu" {...props}>
      <NavLink
        aria-label={`${ariaLabelHome}`}
        to={PATHS.HOME.href}
        data-active={PATHS.HOME.href == location.pathname}
        className="nav-link"
      >
        <HomeIcon size={18} />
        Home
      </NavLink>
      <NavLink
        aria-label={`${ariaLabelTasks}`}
        to={PATHS.TODOS.href}
        data-active={PATHS.TODOS.href == location.pathname}
        className="nav-link"
      >
        <CheckCircle size={18} />
        To-Do List
      </NavLink>
    </nav>
  );
}
