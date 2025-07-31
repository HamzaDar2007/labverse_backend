import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceItemsService } from './invoice-items.service';
import { InvoiceItemsController } from './invoice-items.controller';
import { InvoiceItem } from '../invoices/entities/invoice_item.entity'; 
import { Invoice } from '../invoices/entities/invoice.entity';
import { Service as ServiceEntity } from '../services/entities/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceItem, Invoice, ServiceEntity])],
  controllers: [InvoiceItemsController],
  providers: [InvoiceItemsService],
})
export class InvoiceItemsModule {}
