import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ProjectTechnologyService } from './project_technology.service';
import { AssignProjectTechnologyDto } from './dto/assign-project-technology.dto';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('project-technologies')
export class ProjectTechnologyController {
  constructor(private readonly service: ProjectTechnologyService) {}

  @Post()
  async assignTechnology(@Body() dto: AssignProjectTechnologyDto) {
    return this.service.assignTechnologyToProject(dto);
  }

  @Get()
  async getAllLinks() {
    return this.service.getAllLinks();
  }

  @Get(':id')
  async getLinkById(@Param('id') id: string) {
    const result = await this.service.getLinkById(id);
    if (!result) throw new NotFoundException('Link not found');
    return result;
  }

  @Patch(':id')
  async updateLink(
    @Param('id') id: string,
    @Body() dto: AssignProjectTechnologyDto,
  ) {
    return this.service.updateLink(id, dto);
  }

  @Delete(':id')
  async removeLink(@Param('id') id: string) {
    return this.service.removeLink(id);
  }
}
