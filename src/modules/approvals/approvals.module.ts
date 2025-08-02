// client-approvals.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientApprovalsService } from './approvals.service'; 
import { ClientApprovalsController } from './approvals.controller'; 
import { ClientApproval } from './entities/client-approval.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientApproval])],
  controllers: [ClientApprovalsController],
  providers: [ClientApprovalsService],
})
export class ClientApprovalsModule {}
