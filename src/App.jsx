import "./App.css";
import { TodoList } from "./components/TodoList/TodoList";
import { TodoProvider } from "./contexts/TodoContext";
import { TodoForm } from "./components/TodoList/TodoForm";

function App() {
  return (
    <TodoProvider>
      <TodoForm />
      <TodoList />
    </TodoProvider>
  );
}

export default App;
