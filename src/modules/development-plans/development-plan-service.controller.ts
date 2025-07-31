import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { DevelopmentPlanServicesService } from './development-plan-service.service';
import { CreateDevelopmentPlanServiceDto } from './dto/create-development-plan-service.dto'; 
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; 
import { RolesGuard } from 'src/common/guards/roles.guard'; 
@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('development-plan-services')
export class DevelopmentPlanServiceController {
  constructor(private readonly service: DevelopmentPlanServicesService) {}

  @Post()
  create(@Body() dto: CreateDevelopmentPlanServiceDto) {
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
  update(@Param('id') id: string, @Body() dto: CreateDevelopmentPlanServiceDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
