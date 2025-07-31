import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevelopmentPlanFeature } from './entities/development-plan-feature.entity';
import { DevelopmentPlanFeatureService } from './development-plan-feature.service';
import { DevelopmentPlanFeatureController } from './development-plan-feature.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DevelopmentPlanFeature])],
  controllers: [DevelopmentPlanFeatureController],
  providers: [DevelopmentPlanFeatureService],
})
export class DevelopmentPlanFeatureModule {}
