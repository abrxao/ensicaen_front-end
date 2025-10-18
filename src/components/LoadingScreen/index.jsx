import { Trans } from "@lingui/react/macro";

export default function LoadingScreen({ loading }) {
  return (
    <div className="loading-screen" data-is-loading={loading}>
      <div className="loading-content">
        <div className="title">Mes Tâches</div>
        <div className="loading-progress-bar">
          <div className="loading-progress"></div>
        </div>
        <p>
          <Trans>Bienvenue à votre solution d'organisation</Trans>
        </p>
      </div>
    </div>
  );
}
