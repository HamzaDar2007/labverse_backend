import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevelopmentPlanTechnology } from './entities/development-plan-technology.entity'; 
import { DevelopmentPlanTechnologyService } from './development-plan-technology.service';
import { DevelopmentPlanTechnologyController } from './development-plan-technology.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DevelopmentPlanTechnology])],
  controllers: [DevelopmentPlanTechnologyController],
  providers: [DevelopmentPlanTechnologyService],
})
export class DevelopmentPlanTechnologyModule {}
