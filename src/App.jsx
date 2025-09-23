import "./App.css";
import { TodoList } from "/src/components/TodoList/TodoList";
import { TodoProvider } from "/src/contexts/TodoContext";
import { TodoForm } from "/src/components/TodoList/TodoForm";

function App() {
  return (
    <TodoProvider>
      <TodoForm />
      <TodoList />
    </TodoProvider>
  );
}

export default App;
