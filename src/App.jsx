import "./App.css";
import { BoxProvider } from "./components/BoxProvider";
import { TodoItem } from "./components/TodoList/TodoItem";
import { ThemeProvider } from "./contexts/TodoContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <TodoItem />
        <BoxProvider />
      </ThemeProvider>
    </>
  );
}

export default App;
