import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanFeature } from './entities/plan-feature.entity'; 
import { PlanFeatureService } from './plan-feature.service';
import { PlanFeatureController } from './plan-feature.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlanFeature])],
  controllers: [PlanFeatureController],
  providers: [PlanFeatureService],
})
export class PlanFeatureModule {}