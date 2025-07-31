import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { PlanFeatureService } from './plan-feature.service'; 
import { CreatePlanFeatureDto } from './dto/create-plan-feature.dto'; 
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; 
import { RolesGuard } from 'src/common/guards/roles.guard'; 
@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('plan-features')
export class PlanFeatureController {
  constructor(private readonly service: PlanFeatureService) {}

  @Post()
  create(@Body() dto: CreatePlanFeatureDto) {
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
  update(@Param('id') id: string, @Body() dto: CreatePlanFeatureDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}