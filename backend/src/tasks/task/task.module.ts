import { TaskEntity } from './task.entity';
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
