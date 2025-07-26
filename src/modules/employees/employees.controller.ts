import {
  Controller, Get, Post, Body, Param, Patch, Delete, UseGuards
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeProfileDto } from './dto/create-employee-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-employee-profile.dto';
// import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleEnum } from '../roles/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  // @Roles(RoleEnum.ADMIN)
  create(@Body() dto: CreateEmployeeProfileDto) {
    return this.employeesService.create(dto);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEmployeeProfileDto) {
    return this.employeesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }

  @Post(':employeeId/skills/:skillId')
  assignSkill(@Param('employeeId') employeeId: string, @Param('skillId') skillId: string) {
    return this.employeesService.assignSkill(employeeId, skillId);
  }

  @Get('skills/:skillId')
  findBySkill(@Param('skillId') skillId: string) {
    return this.employeesService.findBySkill(skillId);
  }
}
