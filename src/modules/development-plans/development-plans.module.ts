import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevelopmentPlansController } from './development-plans.controller'; 
import { DevelopmentPlansService } from './development-plans.service'; 
import { DevelopmentPlan } from './entities/development-plan.entity';
import { PlanFeature } from './entities/plan-feature.entity';
import { DevelopmentPlanFeature } from './entities/development-plan-feature.entity';
import { DevelopmentPlanService } from './entities/development-plan-service.entity';
import { DevelopmentPlanTechnology } from './entities/development-plan-technology.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DevelopmentPlan,
      PlanFeature,
      DevelopmentPlanFeature,
      DevelopmentPlanService,
      DevelopmentPlanTechnology,
    ]),
  ],
  controllers: [DevelopmentPlansController],
  providers: [DevelopmentPlansService],
})
export class DevelopmentPlansModule {}
