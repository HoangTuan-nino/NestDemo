import { useState } from "react";
import "./App.css";
import TaskListt from "./tasks/TaskList";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <TaskListt />
      {/* <Counter countProps={count} setCountProps={setCount} /> */}
    </div>
  );
}

export default App;
