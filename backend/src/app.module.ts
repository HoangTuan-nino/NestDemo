import { TaskModule } from './tasks/task/task.module';
import { CoursesModule } from './courses/courses/courses.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({ autoLoadEntities: true, synchronize: true }),
    TaskModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
