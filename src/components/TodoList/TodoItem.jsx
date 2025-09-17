import { useState } from "react";
export function TodoItem() {
  const [isEditing, setIsEditing] = useState(true);
  return (
    <div>
      <input type="checkbox" />
      {isEditing ? <input></input> : <span>Correcting typing of code</span>}
      {isEditing ? (
        <button
          onDoubleClick={() => {
            console.log("true");
            setIsEditing(true);
          }}
        >
          Confirm
        </button>
      ) : (
        <button
          onClick={() => {
            console.log("true");
            setIsEditing(false);
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
}
