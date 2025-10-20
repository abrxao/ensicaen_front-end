import { useTodoContext } from "src/contexts/TodoContext";
import { TodoItem } from "src/components/TodoGroup/TodoItem";
import EmptyTodoList from "src/components/TodoGroup/TodoList/EmptyTodoList";
import { Trans } from "@lingui/react/macro";
import { Archive } from "lucide-react";

export function ArchivedTaskList() {
  const { state } = useTodoContext();

  return (
    <div>
      {state.archivedTodos.length != 0 && (
        <h2>
          <Archive size={28} />
          <Trans>Votre tâches archivées</Trans>
        </h2>
      )}

      <div className="todo-list">
        {state.archivedTodos.map((todo, _) => (
          <TodoItem key={todo.id} todo={todo} archived={true} />
        ))}
        {!state.archivedTodos.length && <EmptyTodoList />}
      </div>
    </div>
  );
}
