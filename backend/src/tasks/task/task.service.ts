import { CreateTaskDTO } from './dto/create-task.dto';
import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TaskEntity } from './task.entity';
import { TaskDTO } from './dto/task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}
  async findAll(): Promise<TaskEntity[]> {
    return await this.taskRepository.find();
  }
  async findOne(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne(id);
    if (!task)
      throw new NotFoundException(`Task with the id ${id} was not found`);
    return task;
  }
  async create(createTaskRequest: CreateTaskDTO): Promise<TaskEntity> {
    const task: TaskEntity = new TaskEntity();
    task.name = createTaskRequest.name;
    task.description = createTaskRequest.description;
    task.isDone = createTaskRequest.isDone;
    await this.taskRepository.save(task);
    return task;
  }
  async updateOne(taskId: number, updateTaskRequest: UpdateTaskDTO) {
    // fetch and check if task exists
    const task: TaskEntity = await this.findOne(taskId);
    // check which properties are set in the dto
    task.name = updateTaskRequest.name || task.name;
    task.description = updateTaskRequest.description || task.description;
    task.isDone = updateTaskRequest.isDone || task.isDone;
    // update the properties on the task
    await this.taskRepository.save(task);
    return task;
  }
  async delete(id: number): Promise<DeleteResult> {
    const task: TaskEntity = await this.findOne(id);
    return await this.taskRepository.delete(task);
  }
}
