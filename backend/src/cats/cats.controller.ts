import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cat')
export class CatsController {
  constructor(private readonly catService: CatsService) {}
  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.findAllCat();
  }
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catService.createCat(createCatDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
