import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { EmployeeProfile } from '../../employees/entities/employee_profile.entity';
import { ProjectMember } from '../project_member/entities/project_member.entity';
import { AssignMemberDto } from '../project_member/dto/assign-member.dto';
import { Technology } from '../../technologies/entities/technology.entity';
import { ProjectTechnology } from '../../technologies/entities/project_technology.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,

    @InjectRepository(ProjectMember)
    private readonly memberRepo: Repository<ProjectMember>,

    @InjectRepository(EmployeeProfile)
    private readonly employeeRepo: Repository<EmployeeProfile>,

    @InjectRepository(Technology)
    private readonly techRepo: Repository<Technology>,

    @InjectRepository(ProjectTechnology)
    private readonly projTechRepo: Repository<ProjectTechnology>,
  ) {}

  async create(dto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepo.create(dto);
    return this.projectRepo.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepo.find({
      relations: ['members', 'members.employee', 'technologies', 'technologies.technology'],
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepo.findOne({
      where: { id },
      relations: ['members', 'members.employee', 'technologies', 'technologies.technology'],
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async update(id: string, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.findOne(id);
    Object.assign(project, dto);
    return this.projectRepo.save(project);
  }

  async remove(id: string): Promise<void> {
    await this.projectRepo.delete(id);
  }

  async assignMember(dto: AssignMemberDto): Promise<ProjectMember> {
    const project = await this.findOne(dto.projectId);
    const employee = await this.employeeRepo.findOne({ where: { id: dto.employeeId } });

    if (!employee) throw new NotFoundException('Employee not found');

    const member = this.memberRepo.create({
      project,
      employee,
      roleOnProject: dto.roleOnProject,
    });

    return this.memberRepo.save(member);
  }

  async assignTechnology(projectId: string, technologyId: string): Promise<ProjectTechnology> {
    const project = await this.findOne(projectId);
    const tech = await this.techRepo.findOne({ where: { id: technologyId } });

    if (!tech) throw new NotFoundException('Technology not found');

    const link = this.projTechRepo.create({
      project,
      technology: tech,
    });

    return this.projTechRepo.save(link);
  }
}
