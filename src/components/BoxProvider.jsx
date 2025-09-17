import { useContext } from "react";
import { ThemeContext } from "../contexts/TodoContext";

export function BoxProvider() {
  const { theme } = useContext(ThemeContext);

  return <h3>{theme}</h3>;
}
