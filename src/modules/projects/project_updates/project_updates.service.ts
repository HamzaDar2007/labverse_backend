import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectUpdate } from './entities/project-update.entity';
import { CreateProjectUpdateDto } from './dto/create-project-update.dto';
import { UpdateProjectUpdateDto } from './dto/update-project-update.dto';

@Injectable()
export class ProjectUpdatesService {
  constructor(
    @InjectRepository(ProjectUpdate)
    private readonly updateRepo: Repository<ProjectUpdate>,
  ) {}

  async create(dto: CreateProjectUpdateDto) {
    const update = this.updateRepo.create({
      ...dto,
      update_date: dto.update_date ? new Date(dto.update_date) : new Date(),
    });
    return this.updateRepo.save(update);
  }

  findAll() {
    return this.updateRepo.find({ relations: ['milestone'] });
  }

  async findOne(id: string) {
    return this.updateRepo.findOne({ where: { id }, relations: ['milestone'] });
  }

  async update(id: string, dto: UpdateProjectUpdateDto) {
    const update = await this.updateRepo.preload({
      id,
      ...dto,
      update_date: dto.update_date ? new Date(dto.update_date) : undefined,
    });
    if (!update) {
      throw new NotFoundException('Project update not found');
    }
    return this.updateRepo.save(update);
  }

  async remove(id: string) {
    const result = await this.updateRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Project update not found');
    }
    return { message: 'Deleted successfully' };
  }

  async findByProject(projectId: string) {
    return this.updateRepo
      .createQueryBuilder('update')
      .leftJoinAndSelect('update.milestone', 'milestone')
      .leftJoinAndSelect('milestone.project', 'project')
      .where('project.id = :projectId', { projectId })
      .getMany();
  }
}
