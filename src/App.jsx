import "./App.css";
import { BoxProvider } from "./components/BoxProvider";
import { TodoList } from "./components/TodoList/TodoList";
import { TodoProvider } from "./contexts/TodoContext";

function App() {
  return (
    <TodoProvider>
      <TodoList />
      <BoxProvider />
    </TodoProvider>
  );
}

export default App;
