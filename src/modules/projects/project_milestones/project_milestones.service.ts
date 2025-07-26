import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectMilestone } from './entities/project-milestone.entity';
import { CreateProjectMilestoneDto } from './dto/create-project-milestone.dto';
import { UpdateProjectMilestoneDto } from './dto/update-project-milestone.dto';
@Injectable()
export class ProjectMilestonesService {
  constructor(
    @InjectRepository(ProjectMilestone)
    private milestoneRepo: Repository<ProjectMilestone>,
  ) {}

  create(dto: CreateProjectMilestoneDto) {
  const milestone = this.milestoneRepo.create({
    title: dto.title,
    description: dto.description,
    due_date: dto.due_date,
    project: { id: dto.project_id } as any, // 👈 convert project_id to relation
  });

  return this.milestoneRepo.save(milestone);
}

  findAll() {
    return this.milestoneRepo.find({ relations: ['project'] });
  }

  findOne(id: string) {
    return this.milestoneRepo.findOne({ where: { id }, relations: ['project'] });
  }

async update(id: string, dto: UpdateProjectMilestoneDto) {
  await this.milestoneRepo.update(id, dto);
  return this.milestoneRepo.findOne({ where: { id }, relations: ['project'] });
  }

  remove(id: string) {
    return this.milestoneRepo.delete(id);
  }
}
