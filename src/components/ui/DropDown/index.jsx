import { ChevronsDown } from "lucide-react";

export function Option({ children, ...props }) {
  return (
    <option className="drop-down-option" {...props}>
      {children}
    </option>
  );
}

export default function DropDown({ children, ...props }) {
  return (
    <div className="drop-down">
      <select {...props}>{children}</select>
      <ChevronsDown className="drop-down-icon" size={20} />
    </div>
  );
}
