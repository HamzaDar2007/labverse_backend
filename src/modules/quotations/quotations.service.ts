import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientPlanQuotation } from './entities/client_plan_quotation.entity'; 
import { CreateQuotationDto } from './dto/create-quotation.dto'; 
import { UpdateQuotationStatusDto } from './dto/update-quotation-status.dto'; 
import { UpdateQuotationDto } from './dto/update-quotation.dto';
@Injectable()
export class QuotationsService {
  constructor(
    @InjectRepository(ClientPlanQuotation)
    private quotationRepo: Repository<ClientPlanQuotation>,
  ) {}

async create(dto: CreateQuotationDto) {
  const quote = this.quotationRepo.create({
    custom_note: dto.custom_note,
    quotation_total: dto.quotation_total,
    client: { id: dto.client_id }, // 👈 set relation using id
    development_plan: dto.development_plan_id
      ? { id: dto.development_plan_id }
      : null,
  });

  return this.quotationRepo.save(quote);
}
  findAll() {
    return this.quotationRepo.find({ relations: ['client', 'development_plan'] });
  }

  async findOne(id: string) {
    const quote = await this.quotationRepo.findOne({ where: { id } });
    if (!quote) throw new NotFoundException('Quotation not found');
    return quote;
  }

 async update(id: string, dto: UpdateQuotationDto) {
  const quote = await this.quotationRepo.findOne({ where: { id } });
  if (!quote) throw new NotFoundException('Quotation not found');

  if (dto.client_id) quote.client = { id: dto.client_id } as any;
  if (dto.development_plan_id)
    quote.development_plan = { id: dto.development_plan_id } as any;
  if (dto.custom_note !== undefined) quote.custom_note = dto.custom_note;
  if (dto.quotation_total !== undefined)
    quote.quotation_total = dto.quotation_total;

  return this.quotationRepo.save(quote);
}

 async remove(id: string) {
  const quote = await this.quotationRepo.findOne({ where: { id } });
  if (!quote) throw new NotFoundException('Quotation not found');
  return this.quotationRepo.remove(quote);
}

}
