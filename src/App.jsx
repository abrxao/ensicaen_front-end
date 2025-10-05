import "./App.css";
import { TodoList } from "/src/components/TodoList/TodoList";
import { TodoProvider } from "/src/contexts/TodoContext";
import { TodoForm } from "/src/components/TodoList/TodoForm";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <TodoProvider>
      <Toaster position="bottom-right" reverseOrder={true} />
      <section className="todo-content">
        <TodoForm />
        <TodoList />
      </section>
    </TodoProvider>
  );
}

export default App;
