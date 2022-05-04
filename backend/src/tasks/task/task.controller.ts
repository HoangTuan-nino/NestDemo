import { CreateTaskDTO } from './dto/create-task.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TaskEntity } from './task.entity';
import { TaskService } from './task.service';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Get()
  @ApiOkResponse({ status: 200, type: TaskEntity, isArray: true })
  async findAll(): Promise<TaskEntity[]> {
    return await this.taskService.findAll();
  }
  @Get(':id')
  @ApiOkResponse({ status: 200, type: TaskEntity })
  async findOne(@Param('id') id) {
    return await this.taskService.findOne(id);
  }
  @Post()
  @ApiOkResponse({ status: 201, type: TaskEntity })
  async create(@Body() createTaskRequest: CreateTaskDTO) {
    const res = await this.taskService.create(createTaskRequest);
    return res;
  }
  @Put()
  async update(@Body() task: TaskEntity) {
    return await this.taskService.update(task);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() params) {
    return await this.taskService.delete(params.id);
  }
}
