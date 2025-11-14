import { TodoItem } from "src/components/TodoGroup/TodoItem";
import EmptyTodoList from "src/components/TodoGroup/TodoList/EmptyTodoList";
import { Trans } from "@lingui/react/macro";
import { Archive } from "lucide-react";
import { useTodoContext } from "src/contexts/TodoContext";

export function ArchivedTaskList() {
  const { state } = useTodoContext();

  return (
    <div>
      {state.archivedTodos.length != 0 && (
        <div className="archived-title">
          <Archive size={24} c />
          <h2>
            <Trans>Votre tâches archivées</Trans>
          </h2>
        </div>
      )}

      <div className="todo-list">
        {state.archivedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} archived={true} />
        ))}
        {!state.archivedTodos.length && <EmptyTodoList />}
      </div>
    </div>
  );
}
