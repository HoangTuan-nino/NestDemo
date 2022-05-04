import { useEffect, useState } from "react";
import { TaskDTO } from "../api/dto/task.dto";
import { TaskAPI } from "../api/task.api";
function TaskListt() {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  useEffect(() => {
    fetchAll();
  }, []);
  async function fetchAll() {
    const res = await TaskAPI.getAll();
    setTasks(res);
  }
  return (
    <div>
      <ul>
        {tasks.map((task) => {
          return <li key={task.id}>{task.name}</li>;
        })}
      </ul>
    </div>
  );
}
export default TaskListt;
