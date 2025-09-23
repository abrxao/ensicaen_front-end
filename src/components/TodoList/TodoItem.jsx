import { useContext, useState } from "react";
import { TodoContext } from "../../contexts/TodoContext";
import "./TodoItem.css";
export function TodoItem({ id }) {
  // TODO -
  // Integrate context
  const { todoState, dispatch } = useContext(TodoContext);
  const [isCompleted, setIsCompleted] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todoState.todos[id].text);

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => {
          setIsCompleted(!isCompleted);
        }}
      />
      {isEditing ? (
        <input
          defaultValue={todoState.todos[id].text}
          onChange={(event) => {
            event.preventDefault();
            setText(event.target.value);
          }}
        />
      ) : (
        <span>{todoState.todos[id].text}</span>
      )}

      {isEditing ? (
        <button
          onClick={() => {
            dispatch({
              type: "UPDATE",
              payload: {
                ...todoState.todos[id],
                text: text,
              },
            });
            setIsEditing(false);
          }}
        >
          Confirm
        </button>
      ) : (
        <button
          onDoubleClick={() => {
            setIsEditing(true);
          }}
        >
          Edit
        </button>
      )}
      <button
        onClick={() => {
          dispatch({
            type: "DELETE",
            payload: {
              ...todoState.todos[id],
            },
          });
          setIsEditing(false);
        }}
      >
        Delete
      </button>
    </div>
  );
}
