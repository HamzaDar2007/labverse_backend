import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { DevelopmentPlanTechnologyService } from './development-plan-technology.service';
import { CreateDevelopmentPlanTechnologyDto } from './dto/create-development-plan-technology.dto'; 
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; 
import { RolesGuard } from 'src/common/guards/roles.guard'; 
@UseGuards(JwtAuthGuard, RolesGuard)

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
