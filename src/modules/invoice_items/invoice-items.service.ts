import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoiceItem } from '../invoices/entities/invoice_item.entity';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';
import { Invoice } from '../invoices/entities/invoice.entity';
import { Service } from '../services/entities/service.entity';

@Injectable()
export class InvoiceItemsService {
  constructor(
    @InjectRepository(InvoiceItem) private itemRepo: Repository<InvoiceItem>,
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
    @InjectRepository(Service) private serviceRepo: Repository<Service>
  ) {}

  async create(dto: CreateInvoiceItemDto) {
    const invoice = await this.invoiceRepo.findOne({ where: { id: dto.invoice_id } });
    if (!invoice) throw new NotFoundException('Invoice not found');

    const service = dto.service_id
      ? await this.serviceRepo.findOne({ where: { id: dto.service_id } })
      : null;

    const item = this.itemRepo.create({
      ...dto,
      invoice,
      service,
    });

    return this.itemRepo.save(item);
  }

  findAll() {
    return this.itemRepo.find({ relations: ['invoice', 'service'] });
  }

  async findOne(id: string) {
    const item = await this.itemRepo.findOne({ where: { id }, relations: ['invoice', 'service'] });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(id: string, dto: UpdateInvoiceItemDto) {
    const item = await this.findOne(id);

    if (dto.service_id) {
      const service = await this.serviceRepo.findOne({ where: { id: dto.service_id } });
      if (!service) throw new NotFoundException('Service not found');
      item.service = service;
    }

    Object.assign(item, dto);
    return this.itemRepo.save(item);
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    return this.itemRepo.remove(item);
  }
}
