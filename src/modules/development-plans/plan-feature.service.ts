import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanFeature } from './entities/plan-feature.entity'; 
import { NotFoundException } from '@nestjs/common';

import { CreatePlanFeatureDto } from './dto/create-plan-feature.dto'; 

@Injectable()
export class PlanFeatureService {
  constructor(
    @InjectRepository(PlanFeature)
    private readonly repo: Repository<PlanFeature>
  ) {}

  create(dto: CreatePlanFeatureDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({ relations: ['development_plan_links'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['development_plan_links'] });
  }

  async update(id: string, dto: CreatePlanFeatureDto) {
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
