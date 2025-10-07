import React from "react";
import { useLingui } from "@lingui/react";
import { i18n } from "@lingui/core";
import DropDown, { Option } from "/src/components/ui/DropDown";

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
    <DropDown value={linguiI18n.locale} onChange={handleChange}>
      {languages.map((lang) => (
        <Option key={lang.code} value={lang.code}>
          {lang.label}
        </Option>
      ))}
    </DropDown>
  );
};

export default DropDownLangue;
