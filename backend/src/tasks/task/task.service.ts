import { CreateTaskDTO } from './dto/create-task.dto';
import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TaskEntity } from './task.entity';
import { TaskDTO } from './dto/task.dto';

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
  async update(task: TaskEntity): Promise<UpdateResult> {
    return await this.taskRepository.update(task.id, task);
  }
  async delete(id: number): Promise<DeleteResult> {
    const task: TaskEntity = await this.findOne(id);
    return await this.taskRepository.delete(task);
  }
}
