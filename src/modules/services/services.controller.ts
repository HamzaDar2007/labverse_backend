import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { ServicesService } from '../services/services.service';
import { CreateServiceDto } from './dto/create-service.dto'; 
import { UpdateServiceDto } from './dto/update-service.dto'; 

@Controller('services')
export class ServicesController {
  constructor(private readonly service: ServicesService) {}

  @Post()
  create(@Body() dto: CreateServiceDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}