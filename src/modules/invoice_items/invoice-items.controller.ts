import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InvoiceItemsService } from './invoice-items.service';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; 
import { RolesGuard } from 'src/common/guards/roles.guard'; 
@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('invoice-items')
export class InvoiceItemsController {
  constructor(private readonly invoiceItemService: InvoiceItemsService,) {}

  @Post()
  create(@Body() dto: CreateInvoiceItemDto) {
  return this.invoiceItemService.create(dto);
}


  @Get()
  findAll() {
    return this.invoiceItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceItemService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateInvoiceItemDto) {
    return this.invoiceItemService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceItemService.remove(id);
  }
}
