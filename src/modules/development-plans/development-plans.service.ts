import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevelopmentPlan } from './entities/development-plan.entity'; 
import { PlanFeature } from './entities/plan-feature.entity'; 
import { DevelopmentPlanFeature } from './entities/development-plan-feature.entity'; 
import { DevelopmentPlanService } from './entities/development-plan-service.entity'; 
import { DevelopmentPlanTechnology } from './entities/development-plan-technology.entity'; 
import { CreateDevelopmentPlanDto } from './dto/create-development-plan.dto'; 
import { UpdateDevelopmentPlanDto } from './dto/update-development-plan.dto'; 
import { UpdateDevelopmentPlanRelationsDto } from './dto/update-development-plan-relations.dto'; 

@Injectable()
export class DevelopmentPlansService {
  constructor(
    @InjectRepository(DevelopmentPlan)
    private devPlanRepo: Repository<DevelopmentPlan>,

    @InjectRepository(PlanFeature)
    private featureRepo: Repository<PlanFeature>,

    @InjectRepository(DevelopmentPlanFeature)
    private planFeatureRepo: Repository<DevelopmentPlanFeature>,

    @InjectRepository(DevelopmentPlanService)
    private planServiceRepo: Repository<DevelopmentPlanService>,

    @InjectRepository(DevelopmentPlanTechnology)
    private planTechRepo: Repository<DevelopmentPlanTechnology>,
  ) {}

  create(dto: CreateDevelopmentPlanDto) {
    const plan = this.devPlanRepo.create(dto);
    return this.devPlanRepo.save(plan);
  }

  findAll() {
    return this.devPlanRepo.find({
      relations: ['feature_links', 'service_links', 'technology_links'],
    });
  }

  async findOne(id: string) {
    const plan = await this.devPlanRepo.findOne({
      where: { id },
      relations: ['feature_links', 'service_links', 'technology_links'],
    });
    if (!plan) throw new NotFoundException('Development plan not found');
    return plan;
  }

  async update(id: string, dto: UpdateDevelopmentPlanDto) {
    await this.findOne(id);
    await this.devPlanRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const plan = await this.findOne(id);
    return this.devPlanRepo.remove(plan);
  }

  async updateRelations(dto: UpdateDevelopmentPlanRelationsDto) {
    const { development_plan_id, feature_ids, service_ids, technology_ids } = dto;

    await this.planFeatureRepo.delete({ development_plan: { id: development_plan_id } });
    await this.planServiceRepo.delete({ development_plan: { id: development_plan_id } });
    await this.planTechRepo.delete({ development_plan: { id: development_plan_id } });

    const plan = await this.findOne(development_plan_id);

    for (const feature_id of feature_ids) {
      await this.planFeatureRepo.save({ development_plan: plan, feature: { id: feature_id } });
    }

    for (const service_id of service_ids) {
      await this.planServiceRepo.save({ development_plan: plan, service: { id: service_id } });
    }

    for (const tech_id of technology_ids) {
      await this.planTechRepo.save({ development_plan: plan, technology: { id: tech_id } });
    }

    return { message: 'Relations updated successfully' };
  }
}
