// ✅ development-plan-service.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevelopmentPlanService } from './entities/development-plan-service.entity'; 
import { DevelopmentPlanServicesService } from './development-plan-service.service';
import { DevelopmentPlanServiceController } from './development-plan-service.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DevelopmentPlanService])],
  controllers: [DevelopmentPlanServiceController],
  providers: [DevelopmentPlanServicesService],
})
export class DevelopmentPlanServiceModule {}
