import { UpdateTaskDTO } from "./dto/update-task.dto";
import { CreateTaskDTO } from "./dto/create-task.dto";
import { TaskDTO } from "./dto/task.dto";
export class TaskAPI {
  public static async getAll(): Promise<TaskDTO[]> {
    const res = await fetch("http://localhost:3000/tasks", { method: "GET" });
    const data = await res.json();
    return data;
  }
  public static async createOne(createResquest: CreateTaskDTO) {
    const res = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createResquest),
    });
    const data = await res.json();
    return data;
  }
  public static async deleteOne(taskId: number) {
    const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });
  }
  public static async updateOne(
    taskId: number,
    updateTaskRequest: UpdateTaskDTO
  ) {
    const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateTaskRequest),
    });
    const data = await res.json();
    return data;
  }
}
