import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotationsController } from './quotations.controller'; 
import { QuotationsService } from './quotations.service'; 
import { ClientPlanQuotation } from './entities/client_plan_quotation.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([ClientPlanQuotation])],
  controllers: [QuotationsController],
  providers: [QuotationsService],
})
export class QuotationsModule {}
