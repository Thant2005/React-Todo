import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm.js";
import TodoList from "./components/TodoList.js";
import CheckAllAndRemaining from "./components/CheckAllAndRemaining.js";
import TodoFilters from "./components/TodoFilters.js";
import ClearCompleted from "./components/ClearCompleted.js";
import { useEffect, useState } from "react";
function App() {
  let [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);
  //client
  let addTodo = (todo) => {
    setTodos((prevState) => [...prevState, todo]);
    //server
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
  };

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        <TodoForm addTodo={addTodo} />

        <TodoList todos={todos} />

        <CheckAllAndRemaining />

        <div className="other-buttons-container">
          <TodoFilters />

          <ClearCompleted />
        </div>
      </div>
    </div>
  );
}

export default App;
