import { NavLink } from "react-router";
import { PATHS } from "/src/paths";
import { CheckCircle, HomeIcon } from "lucide-react";
import { useLocation } from "react-router";

export default function NavigationMenu({ children, ...props }) {
  const location = useLocation();

  return (
    <nav className="navigation-menu" {...props}>
      <NavLink
        to={PATHS.HOME.href}
        data-active={PATHS.HOME.href == location.pathname}
        className="nav-link"
      >
        <HomeIcon size={18} />
        Home
      </NavLink>
      <NavLink
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
