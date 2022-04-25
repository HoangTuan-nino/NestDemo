import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TaskEntity } from './task.entity';

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
    return await this.taskRepository.findOne(id);
  }
  async create(task: TaskEntity): Promise<TaskEntity> {
    return await this.taskRepository.save(task);
  }
  async update(task: TaskEntity): Promise<UpdateResult> {
    return await this.taskRepository.update(task.id, task);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.taskRepository.delete(id);
  }
}
