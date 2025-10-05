import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import mFR from "./locales/fr/messages";
import mEN from "./locales/en/messages";
import "./index.css";

i18n.load({ fr: mFR.messages, en: mEN.messages });
i18n.activate("fr");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nProvider i18n={i18n}>
      <App />
    </I18nProvider>
  </StrictMode>
);
