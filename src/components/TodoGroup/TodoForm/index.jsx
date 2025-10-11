import { useState } from "react";
import { useTodoContext } from "/src/contexts/TodoContext";
import Button from "/src/components/ui/Button";
import InputText from "/src/components/ui/InputText";
import { Trans, useLingui } from "@lingui/react/macro";

export function TodoForm() {
  const { actions } = useTodoContext();
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const { t } = useLingui();
  const placeholder = t`Ajouter une nouvelle tâche`;
  async function handleSubmit(event) {
    event.preventDefault();
    if (text.trim().length) {
      setIsLoading(true);
      await actions.addTodo(text.trim());
      setText("");
      setIsLoading(false);
    }
  }
  return (
    <form onSubmit={(event) => handleSubmit(event)} className="todo-form">
      <InputText
        placeholder={placeholder}
        value={text}
        type="text"
        onChange={(e) => setText(e.target.value)}
      />
      <Button disabled={isLoading}>
        <Trans>Ajouter</Trans>
      </Button>
    </form>
  );
}
