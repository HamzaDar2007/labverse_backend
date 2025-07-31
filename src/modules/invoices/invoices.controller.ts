import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { InvoicesService } from './invoices.service'; 
import { CreateInvoiceDto } from './dto/create-invoice.dto'; 
import { UpdateInvoiceDto } from './dto/update-invoice.dto'; 
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto'; 

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly service: InvoicesService) {}

  @Post()
  create(@Body() dto: CreateInvoiceDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateInvoiceDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post('add-item')
  addItem(@Body() dto: CreateInvoiceItemDto) {
    return this.service.addItem(dto);
  }

  @Get(':id/items')
  getItems(@Param('id') id: string) {
    return this.service.getItems(id);
  }
}
