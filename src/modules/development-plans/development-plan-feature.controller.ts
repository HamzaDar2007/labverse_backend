import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { DevelopmentPlanFeatureService } from './development-plan-feature.service'; 
import { CreateDevelopmentPlanFeatureDto } from './dto/create-development-plan-feature.dto';

@Controller('development-plan-features')
export class DevelopmentPlanFeatureController {
  constructor(private readonly service: DevelopmentPlanFeatureService) {}

  @Post()
  create(@Body() dto: CreateDevelopmentPlanFeatureDto) {
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateDevelopmentPlanFeatureDto) {
    return this.service.update(id, dto);
  }
}
