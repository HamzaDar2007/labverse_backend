import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { DevelopmentPlansService } from './development-plans.service'; 
import { CreateDevelopmentPlanDto } from './dto/create-development-plan.dto'; 
import { UpdateDevelopmentPlanDto } from './dto/update-development-plan.dto'; 
import { UpdateDevelopmentPlanRelationsDto } from './dto/update-development-plan-relations.dto'; 
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; 
import { RolesGuard } from 'src/common/guards/roles.guard'; 
@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('development-plans')
export class DevelopmentPlansController {
  constructor(private readonly service: DevelopmentPlansService) {}

  @Post()
  create(@Body() dto: CreateDevelopmentPlanDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateDevelopmentPlanDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post('update-relations')
  updateRelations(@Body() dto: UpdateDevelopmentPlanRelationsDto) {
    return this.service.updateRelations(dto);
  }
}
