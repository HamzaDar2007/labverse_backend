import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevelopmentPlanService } from './entities/development-plan-service.entity'; 
import { CreateDevelopmentPlanServiceDto } from './dto/create-development-plan-service.dto'; 

@Injectable()
export class DevelopmentPlanServicesService {
  constructor(
    @InjectRepository(DevelopmentPlanService)
    private readonly repo: Repository<DevelopmentPlanService>
  ) {}

  create(dto: CreateDevelopmentPlanServiceDto) {
    const entity = this.repo.create({
      development_plan: { id: dto.development_plan_id },
      service: { id: dto.service_id },
    });
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({ relations: ['development_plan', 'service'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['development_plan', 'service'] });
  }

    async update(id: string, dto: CreateDevelopmentPlanServiceDto) {
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
