import { useState } from "react";
import { useTodoContext } from "/src/contexts/TodoContext";
import "./TodoItem.css";
export function TodoItem({ id }) {
  const {
    state: { todos },
    actions,
  } = useTodoContext();
  const [text, setText] = useState(todos[id].text);

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todos[id].completed}
        onChange={() => actions.toggleTodo({ ...todos[id] })}
      />
      {todos[id].isEditing ? (
        <input
          defaultValue={todos[id].text}
          onChange={(event) => {
            event.preventDefault();
            setText(event.target.value);
          }}
        />
      ) : (
        <span>{todos[id].text}</span>
      )}

      {todos[id].isEditing ? (
        <button
          onClick={() =>
            actions.updateTodo({
              ...todos[id],
              text: text,
              isEditing: false,
            })
          }
        >
          Confirm
        </button>
      ) : (
        <button onDoubleClick={() => actions.startEdit({ ...todos[id] })}>
          Edit
        </button>
      )}
      <button onClick={() => actions.deleteTodo({ ...todos[id] })}>
        Delete
      </button>
    </div>
  );
}
