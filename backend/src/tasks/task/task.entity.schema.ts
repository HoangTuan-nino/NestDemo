import { EntitySchema } from 'typeorm';
import { TaskEntity } from './task.entity';

export const TaskSchema = new EntitySchema<TaskEntity>({
  name: 'Task',
  target: TaskEntity,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    isDone: {
      type: Boolean,
      default: true,
    },
  },
});
