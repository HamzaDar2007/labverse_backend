import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { DevelopmentPlanTechnologyService } from './development-plan-technology.service';
import { CreateDevelopmentPlanTechnologyDto } from './dto/create-development-plan-technology.dto'; 

@Controller('development-plan-technologies')
export class DevelopmentPlanTechnologyController {
  constructor(private readonly service: DevelopmentPlanTechnologyService) {}

  @Post()
  create(@Body() dto: CreateDevelopmentPlanTechnologyDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateDevelopmentPlanTechnologyDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
