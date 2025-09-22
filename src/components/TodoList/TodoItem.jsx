import { useContext, useState } from "react";
import { TodoContext } from "../../contexts/TodoContext";
import { todoReducer } from "../../reducers/TodoReducer";
import "./TodoItem.css";
export function TodoItem({ id }) {
  // TODO -
  // Integrate context
  const { todoState, setTodoState } = useContext(TodoContext);
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
          defaultValue={text}
          onChange={(event) => {
            event.preventDefault();
            setText(event.target.value);
          }}
        />
      ) : (
        <span>{todoState.todos[id].text}</span>
      )}
      <button
        onClick={() => {
          const updateStateObj = todoReducer(todoState, {
            type: "DELETE",
            payload: {
              ...todoState.todos[id],
            },
          });
          setTodoState(updateStateObj);
          setIsEditing(false);
        }}
      >
        DELETE
      </button>
      {isEditing ? (
        <button
          onClick={() => {
            const updateStateObj = todoReducer(todoState, {
              type: "UPDATE",
              payload: {
                ...todoState.todos[id],
                text: text,
              },
            });
            setTodoState(updateStateObj);
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
      <button onClick={() => console.log(isCompleted)}>Delete</button>
    </div>
  );
}
