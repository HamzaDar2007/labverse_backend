// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ProjectUpdate } from './entities/project-update.entity';
// import { Repository } from 'typeorm';
// import { CreateProjectUpdateDto } from './dto/create-project-update.dto';
// import { UpdateProjectUpdateDto } from './dto/update-project-update.dto';

// @Injectable()
// export class ProjectUpdatesService {
//   constructor(
//     @InjectRepository(ProjectUpdate)
//     private readonly repo: Repository<ProjectUpdate>,
//   ) {}

//   async create(dto: CreateProjectUpdateDto) {
//     const update = this.repo.create(dto);
//     return this.repo.save(update);
//   }

//   async findAll() {
//     return this.repo.find({ relations: ['project'] });
//   }

//   async findOne(id: string) {
//     return this.repo.findOne({ where: { id }, relations: ['project'] });
//   }

//   async update(id: string, dto: UpdateProjectUpdateDto) {
//     await this.repo.update(id, dto);
//     return this.findOne(id);
//   }

//   async remove(id: string) {
//     return this.repo.delete(id);
//   }

//   async findByProject(projectId: string) {
//     return this.repo.find({
//       where: { project: { id: projectId } },
//       relations: ['project'],
//       order: { update_date: 'DESC' },
//     });
//   }
// }

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
}
