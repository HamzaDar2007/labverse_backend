import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectTechnology } from './../../technologies/entities/project_technology.entity';
import { AssignProjectTechnologyDto } from './dto/assign-project-technology.dto';
import { Project } from '../project/entities/project.entity';
import { Technology } from '../../technologies/entities/technology.entity';
@Injectable()
export class ProjectTechnologyService {
  constructor(
    @InjectRepository(ProjectTechnology)
    private readonly projectTechRepo: Repository<ProjectTechnology>,

    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,

    @InjectRepository(Technology)
    private readonly technologyRepo: Repository<Technology>,
  ) {}

  async assignTechnologyToProject(dto: AssignProjectTechnologyDto) {
    const project = await this.projectRepo.findOneBy({ id: dto.projectId });
    if (!project) throw new NotFoundException('Project not found');

    const technology = await this.technologyRepo.findOneBy({ id: dto.technologyId });
    if (!technology) throw new NotFoundException('Technology not found');

    const link = this.projectTechRepo.create({ project, technology });
    return this.projectTechRepo.save(link);
  }

  async getAllLinks() {
    return this.projectTechRepo.find({
      relations: ['project', 'technology'],
    });
  }

  async getLinkById(id: string) {
    return this.projectTechRepo.findOne({
      where: { id },
      relations: ['project', 'technology'],
    });
  }

  async updateLink(id: string, dto: AssignProjectTechnologyDto) {
    const link = await this.projectTechRepo.findOne({ where: { id } });
    if (!link) throw new NotFoundException('Link not found');

    const project = await this.projectRepo.findOneBy({ id: dto.projectId });
    const technology = await this.technologyRepo.findOneBy({ id: dto.technologyId });

    if (!project || !technology) throw new NotFoundException('Project or Technology not found');

    link.project = project;
    link.technology = technology;

    return this.projectTechRepo.save(link);
  }

  async removeLink(id: string) {
    const link = await this.projectTechRepo.findOne({ where: { id } });
    if (!link) throw new NotFoundException('Link not found');
    return this.projectTechRepo.remove(link);
  }
}
