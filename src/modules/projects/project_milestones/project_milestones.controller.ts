import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { CreateProjectMilestoneDto } from './dto/create-project-milestone.dto';
import { UpdateProjectMilestoneDto } from './dto/update-project-milestone.dto';
import { ProjectMilestonesService } from './project_milestones.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
@UseGuards(JwtAuthGuard)
@Controller('project-milestones')
export class ProjectMilestonesController {
  constructor(private readonly service: ProjectMilestonesService) {}

  @Post()
  create(@Body() dto: CreateProjectMilestoneDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateProjectMilestoneDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
