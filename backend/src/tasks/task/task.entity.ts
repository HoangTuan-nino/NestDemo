import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 500 })
  @ApiProperty()
  name: string;

  @Column('text')
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  isDone: boolean;
}
