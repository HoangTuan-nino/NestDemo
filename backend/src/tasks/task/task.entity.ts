import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TaskStatus {
  Created = 0,
  InProgress = 1,
  Done = 2,
}
@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: true, length: 500 })
  @ApiProperty()
  name: string;

  @Column({ nullable: true, length: 1024 })
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  isDone: boolean;

  // @Column({ nullable: true, default: TaskStatus.Created })
  // @ApiProperty()
  // status: TaskStatus;
}
