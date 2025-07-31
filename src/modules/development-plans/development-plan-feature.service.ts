import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevelopmentPlanFeature } from './entities/development-plan-feature.entity';
import { CreateDevelopmentPlanFeatureDto } from './dto/create-development-plan-feature.dto'; 


@Injectable()
export class DevelopmentPlanFeatureService {
  constructor(
    @InjectRepository(DevelopmentPlanFeature)
    private readonly repo: Repository<DevelopmentPlanFeature>
  ) {}
    create(dto: CreateDevelopmentPlanFeatureDto) {
        const feature = this.repo.create({
        development_plan: { id: dto.development_plan_id },
        feature: { id: dto.feature_id },
        });
    
        return this.repo.save(feature);
    }
  findAll() {
    return this.repo.find({ relations: ['development_plan', 'feature'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['development_plan', 'feature'] });
  }


  async update(id: string, dto: CreateDevelopmentPlanFeatureDto) {
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
