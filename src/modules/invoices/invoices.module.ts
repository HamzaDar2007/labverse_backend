import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoicesController } from './invoices.controller'; 
import { InvoicesService } from './invoices.service'; 
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from './entities/invoice_item.entity'; 
import { Client } from '../clients/entities/client.entity';
import { ClientPlanQuotation } from '../quotations/entities/client_plan_quotation.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Invoice, InvoiceItem, Client, ClientPlanQuotation])],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
