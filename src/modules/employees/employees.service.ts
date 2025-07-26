import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeProfile } from './entities/employee_profile.entity';
import { CreateEmployeeProfileDto } from './dto/create-employee-profile.dto';
import { UpdateEmployeeProfileDto } from './dto/update-employee-profile.dto';
import { User } from '../users/entities/user.entity';
import { Skill } from '../skills/entities/skill.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeProfile)
    private readonly employeeRepo: Repository<EmployeeProfile>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Skill)
    private readonly skillRepo: Repository<Skill>,
  ) {}

  async create(dto: CreateEmployeeProfileDto): Promise<EmployeeProfile> {
    const employee = this.employeeRepo.create(dto);
    if (dto.userId) {
      employee.user = await this.userRepo.findOne({ where: { id: dto.userId } });
    }
    return this.employeeRepo.save(employee);
  }

  async findAll(): Promise<EmployeeProfile[]> {
    return this.employeeRepo.find({ relations: ['user', 'skills'] });
  }

  async findOne(id: string): Promise<EmployeeProfile> {
    const employee = await this.employeeRepo.findOne({
      where: { id },
      relations: ['user', 'skills'],
    });
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async update(id: string, dto: UpdateEmployeeProfileDto): Promise<EmployeeProfile> {
    const employee = await this.findOne(id);
    Object.assign(employee, dto);
    return this.employeeRepo.save(employee);
  }

  async remove(id: string): Promise<void> {
    await this.employeeRepo.delete(id);
  }

  async assignSkill(employeeId: string, skillId: string): Promise<EmployeeProfile> {
    const employee = await this.findOne(employeeId);
    const skill = await this.skillRepo.findOne({ where: { id: skillId } });
    if (!skill) throw new NotFoundException('Skill not found');
    employee.skills = [...(employee.skills || []), skill];
    return this.employeeRepo.save(employee);
  }

  async findBySkill(skillId: string): Promise<EmployeeProfile[]> {
    return this.employeeRepo
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.skills', 'skill')
      .leftJoinAndSelect('employee.user', 'user')
      .where('skill.id = :skillId', { skillId })
      .getMany();
  }
}
