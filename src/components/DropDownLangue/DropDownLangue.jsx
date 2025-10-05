import React from "react";
import { useLingui } from "@lingui/react";
import { i18n } from "@lingui/core";
import "./DropDownLangue.css";
import { ChevronsDown } from "lucide-react";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
];

const DropDownLangue = () => {
  const { i18n: linguiI18n } = useLingui();

  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.activate(lang);
    linguiI18n.activate(lang);
  };

  return (
    <div className="dropdown-langue">
      <select value={linguiI18n.locale} onChange={handleChange}>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
      <ChevronsDown className="langue-icon" size={20} />
    </div>
  );
};

export default DropDownLangue;
