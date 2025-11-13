import { Trans } from "@lingui/react/macro";
import { NavLink } from "react-router";
import { PATHS } from "src/paths";

export default function PageNotFound() {
  return (
    <div className="error-page-container">
      <div className="error-card">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">
          <Trans>Page non trouvée</Trans>
        </h2>
        <p className="error-message">
          <Trans>
            Oups ! La page que vous recherchez n'existe pas ou a peut-être été
            déplacée.
          </Trans>
        </p>
        <NavLink to={PATHS.HOME.href} className="error-home-link">
          <Trans>Retour à l'accueil</Trans>
        </NavLink>
      </div>
    </div>
  );
}
