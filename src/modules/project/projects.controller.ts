import {
  Controller, Post, Body, Get, Param, Patch, Delete,UseGuards
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AssignMemberDto } from './../project_member/dto/assign-member.dto';
// import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }

  @Post('assign-member')
  assignMember(@Body() dto: AssignMemberDto) {
    return this.projectsService.assignMember(dto);
  }

  @Post(':projectId/assign-technology/:techId')
  assignTechnology(
    @Param('projectId') projectId: string,
    @Param('techId') techId: string,
  ) {
    return this.projectsService.assignTechnology(projectId, techId);
  }
}
