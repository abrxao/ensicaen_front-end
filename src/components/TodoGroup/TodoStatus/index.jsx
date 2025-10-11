import { Trans } from "@lingui/react/macro";
import { ArrowBigRightDash } from "lucide-react";
import { useEffect, useState } from "react";
import Skeleton from "src/components/ui/Skeleton";
import { useTodoContext } from "src/contexts/TodoContext";
import { useTodoAPI } from "src/hooks/useTodoAPI";

export default function TodoStatus() {
  const { state } = useTodoContext();
  const { loading } = useTodoAPI();
  const [progressSize, setProgressSize] = useState(0);
  const [status, setStatus] = useState({
    all: 0,
    completed: 0,
  });

  useEffect(() => {
    if (!loading) {
      handleUpdate();
    }
  }, [state.todos]);

  function handleUpdate() {
    const numOfTodos = state.todos.length;
    const completedTodos = state.todos.reduce(
      (sum, todo) => (todo.completed ? sum + 1 : sum),
      0
    );
    setStatus({ all: numOfTodos, completed: completedTodos });
    if (numOfTodos) {
      const perc = completedTodos / numOfTodos;
      setProgressSize(perc * 100);
    }
  }
  if (loading) {
    return (
      <Skeleton
        style={{
          flexGrow: "1",
          height: "60px",
          borderRadius: "0.5em",
        }}
      />
    );
  }
  return (
    <div className="todo-status">
      <div className="todo-status-content">
        <p className="status-title">
          <b>
            <p>
              {status.all ? (
                <Trans>Votre tâches completition status</Trans>
              ) : (
                <Trans>Vous n'avez pas de tâches</Trans>
              )}
            </p>
          </b>
        </p>
        {status.all != 0 && (
          <div className="progress-group">
            <p>
              <b>{`${status.completed} `}</b>
              <Trans>complets</Trans>
            </p>
            <div className="progressbar">
              <div
                className="progress"
                style={{ width: `${progressSize}%` }}
              ></div>
            </div>
            <div>
              <p>
                {progressSize == 100 ? (
                  <>
                    <Trans>Tout a fait</Trans>
                  </>
                ) : (
                  <>
                    <span className="todo-status-icon">
                      <ArrowBigRightDash size={18} />
                      {status.all - status.completed}
                    </span>
                    <Trans>restantes</Trans>
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
