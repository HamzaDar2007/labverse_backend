// import {
//   Controller,
//   Post,
//   Get,
//   Param,
//   Body,
//   Patch,
//   Delete,
//   UseGuards,
// } from '@nestjs/common';
// import { ProjectUpdatesService } from './project_updates.service';
// import { CreateProjectUpdateDto } from './dto/create-project-update.dto';
// import { UpdateProjectUpdateDto } from './dto/update-project-update.dto';
// import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
// @UseGuards(JwtAuthGuard)
// @Controller('project-updates')
// export class ProjectUpdatesController {
//   constructor(private readonly service: ProjectUpdatesService) {}

//   @Post()
//   create(@Body() dto: CreateProjectUpdateDto) {
//     return this.service.create(dto);
//   }

//   @Get()
//   findAll() {
//     return this.service.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.service.findOne(id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() dto: UpdateProjectUpdateDto) {
//     return this.service.update(id, dto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.service.remove(id);
//   }

//   @Get('/project/:projectId')
//   findByProject(@Param('projectId') projectId: string) {
//     return this.service.findByProject(projectId);
//   }
// }

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ProjectUpdatesService } from './project_updates.service';
import { CreateProjectUpdateDto } from './dto/create-project-update.dto';
import { UpdateProjectUpdateDto } from './dto/update-project-update.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
@UseGuards(JwtAuthGuard)

@Controller('project-updates')
export class ProjectUpdatesController {
  constructor(private readonly projectUpdatesService: ProjectUpdatesService) {}

  @Post()
  create(@Body() createDto: CreateProjectUpdateDto) {
    return this.projectUpdatesService.create(createDto);
  }

  @Get()
  findAll() {
    return this.projectUpdatesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const update = await this.projectUpdatesService.findOne(id);
    if (!update) {
      throw new NotFoundException('Project update not found');
    }
    return update;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateProjectUpdateDto) {
    return this.projectUpdatesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectUpdatesService.remove(id);
  }
}
