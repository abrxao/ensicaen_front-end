import "./App.css";
import { TodoList } from "/src/components/TodoList/TodoList";
import { TodoProvider } from "/src/contexts/TodoContext";
import { TodoForm } from "/src/components/TodoList/TodoForm";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <TodoProvider>
      <Toaster />
      <TodoForm />
      <TodoList />
    </TodoProvider>
  );
}

export default App;
