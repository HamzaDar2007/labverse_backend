import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ProjectMemberService } from './project_member.service';
import { AssignMemberDto } from './dto/assign-member.dto';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('project-members')
export class ProjectMemberController {
  constructor(private readonly projectMemberService: ProjectMemberService) {}

  @Post()
  async assign(@Body() dto: AssignMemberDto) {
    return await this.projectMemberService.assignMember(dto);
  }

  @Get()
  async findAll() {
    return await this.projectMemberService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.projectMemberService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<AssignMemberDto>,
  ) {
    return await this.projectMemberService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.projectMemberService.remove(id);
  }
}
