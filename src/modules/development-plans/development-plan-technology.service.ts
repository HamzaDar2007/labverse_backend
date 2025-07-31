import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevelopmentPlanTechnology } from './entities/development-plan-technology.entity'; 
import { CreateDevelopmentPlanTechnologyDto } from './dto/create-development-plan-technology.dto'; 

@Injectable()
export class DevelopmentPlanTechnologyService {
  constructor(
    @InjectRepository(DevelopmentPlanTechnology)
    private readonly repo: Repository<DevelopmentPlanTechnology>
  ) {}

  create(dto: CreateDevelopmentPlanTechnologyDto) {
    const entity = this.repo.create({
      development_plan: { id: dto.development_plan_id },
      technology: { id: dto.technology_id },
    });
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({ relations: ['development_plan', 'technology'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['development_plan', 'technology'] });
  }


    async update(id: string, dto: CreateDevelopmentPlanTechnologyDto) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`Plan Feature with ID ${id} not found.`);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }


async remove(id: string) {
  const entity = await this.repo.findOne({ where: { id } });
  if (!entity) {
    throw new NotFoundException(`Plan Feature with ID ${id} not found.`);
  }
  return this.repo.remove(entity);
}
}
