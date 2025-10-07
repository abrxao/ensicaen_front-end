import { NavLink } from "react-router";
import { PATHS } from "/src/paths";

export default function NavigationMenu({ children, ...props }) {
  return (
    <nav className="navigation-menu" {...props}>
      <NavLink to={PATHS.TODOS.href} className="nav-link">
        to-dos
      </NavLink>
      <NavLink to={PATHS.HOME.href} className="nav-link">
        home
      </NavLink>
    </nav>
  );
}
