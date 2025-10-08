import { NavLink } from "react-router";
import { PATHS } from "/src/paths";
import { CheckCircle, HomeIcon } from "lucide-react";

export default function NavigationMenu({ children, ...props }) {
  return (
    <nav className="navigation-menu" {...props}>
      <NavLink to={PATHS.HOME.href} className="nav-link">
        <HomeIcon />
        Home
      </NavLink>
      <NavLink to={PATHS.TODOS.href} className="nav-link">
        <CheckCircle />
        To-Do List
      </NavLink>
    </nav>
  );
}
