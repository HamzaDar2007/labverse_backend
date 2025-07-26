import {
  Controller, Get, Post, Body, Param, Patch, Delete, UseGuards
} from '@nestjs/common';
import { TechnologiesService } from './technologies.service';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
// import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('technologies')
export class TechnologiesController {
  constructor(private readonly techService: TechnologiesService) {}

  @Post()
  create(@Body() dto: CreateTechnologyDto) {
    return this.techService.create(dto);
  }

  @Get()
  findAll() {
    return this.techService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.techService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTechnologyDto) {
    return this.techService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.techService.remove(id);
  }
}
