// client-approvals.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientApproval } from './entities/client-approval.entity';
import { CreateClientApprovalDto } from './dto/create-client-approval.dto';
import { UpdateClientApprovalDto } from './dto/update-client-approval.dto';

@Injectable()
export class ClientApprovalsService {
  constructor(
    @InjectRepository(ClientApproval)
    private repo: Repository<ClientApproval>,
  ) {}

  create(dto: CreateClientApprovalDto) {
    const approval = this.repo.create(dto);
    return this.repo.save(approval);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const approval = await this.repo.findOne({ where: { id } });
    if (!approval) throw new NotFoundException('Client approval not found');
    return approval;
  }

  async update(id: string, dto: UpdateClientApprovalDto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const approval = await this.findOne(id);
    return this.repo.remove(approval);
  }
}
