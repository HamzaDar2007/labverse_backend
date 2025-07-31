import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity'; 
import { InvoiceItem } from './entities/invoice_item.entity'; 
import { CreateInvoiceDto } from './dto/create-invoice.dto'; 
import { UpdateInvoiceDto } from './dto/update-invoice.dto'; 
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto'; 
import { Client } from '../clients/entities/client.entity';
import { ClientPlanQuotation } from '../quotations/entities/client_plan_quotation.entity';

@Injectable()
export class InvoicesService {
  constructor(
@InjectRepository(Invoice)
  private invoiceRepo: Repository<Invoice>,

  @InjectRepository(InvoiceItem)
  private itemRepo: Repository<InvoiceItem>,

  @InjectRepository(Client)
  private clientRepo: Repository<Client>,

  @InjectRepository(ClientPlanQuotation)
  private quotationRepo: Repository<ClientPlanQuotation>,
) {}

 async create(dto: CreateInvoiceDto) {
  const client = await this.clientRepo.findOne({ where: { id: dto.client_id } });
  if (!client) throw new NotFoundException('Client not found');

  let quotation = null;
  if (dto.quotation_id) {
    quotation = await this.quotationRepo.findOne({ where: { id: dto.quotation_id } });
    if (!quotation) throw new NotFoundException('Quotation not found');
  }

  const invoice = this.invoiceRepo.create({
    ...dto,
    client,
    quotation,
  });

  return this.invoiceRepo.save(invoice);
}

  findAll() {
    return this.invoiceRepo.find({ relations: ['client', 'quotation', 'items'] });
  }

  async findOne(id: string) {
    const invoice = await this.invoiceRepo.findOne({
      where: { id },
      relations: ['client', 'quotation', 'items'],
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

async update(id: string, dto: UpdateInvoiceDto) {
  if (!dto || Object.keys(dto).length === 0) {
    throw new BadRequestException('Update data is required.');
  }

  await this.findOne(id);
  await this.invoiceRepo.update(id, dto);
  return this.findOne(id);
}

  async remove(id: string) {
    const invoice = await this.findOne(id);
    return this.invoiceRepo.remove(invoice);
  }

  async addItem(dto: CreateInvoiceItemDto) {
    const item = this.itemRepo.create(dto);
    return this.itemRepo.save(item);
  }

  async getItems(invoiceId: string) {
    return this.itemRepo.find({ where: { invoice: { id: invoiceId } }, relations: ['service'] });
  }
}