import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './create-course.dto';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}
  @Get()
  async getCourses() {
    return this.courseService.getCourses();
  }
  @Get(':courseId')
  async getCourseById(@Param('courseId') courseId) {
    const course = await this.courseService.getCourseById(courseId);
    return course;
  }
  @Post()
  async addCourse(@Body() createCourseDto: CreateCourseDto) {
    const course = await this.courseService.addCourse(createCourseDto);
    return course;
  }
  @Delete(':courseId/delete')
  async deleteCourse(@Param('courseId') courseId) {
    const courses = await this.courseService.deleteCourse(courseId);
    return courses;
  }
}
