import { Trans } from "@lingui/react/macro";

export default function EmptyTodoList() {
  return (
    <div className="empty-todo-list-wrapper">
      <div className="empty-todo-list">
        <p>
          <Trans>Il n'y a rien la </Trans>
        </p>
      </div>
    </div>
  );
}
