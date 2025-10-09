import { Trans } from "@lingui/react/macro";
import { CheckCircle, Circle, ListCheck } from "lucide-react";
import ButtonIcon from "src/components/ui/ButtonIcon";
import { useTodoContext } from "src/contexts/TodoContext";

export default function TodoFilter() {
  const { actions, state } = useTodoContext();
  return (
    <div className="todo-filter">
      <ButtonIcon
        onClick={() => actions.setFilterTodo("all")}
        data-selected={state.filter == "all"}
      >
        <ListCheck size={16} className="svg-todo-filter-btn" />
        <Trans>Tous</Trans>
      </ButtonIcon>
      <ButtonIcon
        onClick={() => actions.setFilterTodo("active")}
        data-selected={state.filter == "active"}
      >
        <Circle size={16} className="svg-todo-filter-btn" />
        <Trans>Actif</Trans>
      </ButtonIcon>
      <ButtonIcon
        onClick={() => actions.setFilterTodo("completed")}
        data-selected={state.filter == "completed"}
      >
        <CheckCircle size={16} className="svg-todo-filter-btn" />
        <Trans>Complet</Trans>
      </ButtonIcon>
    </div>
  );
}
