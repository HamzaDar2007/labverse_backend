import { Controller, Post, Get, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { QuotationsService } from './quotations.service'; 
import { CreateQuotationDto } from './dto/create-quotation.dto'; 
import { UpdateQuotationStatusDto } from './dto/update-quotation-status.dto'; 
import { UpdateQuotationDto } from './dto/update-quotation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; 
import { RolesGuard } from 'src/common/guards/roles.guard';
@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('quotations')
export class QuotationsController {
  constructor(private readonly service: QuotationsService) {}

  @Post()
  create(@Body() dto: CreateQuotationDto) {
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
update(@Param('id') id: string, @Body() dto: UpdateQuotationDto) {
  return this.service.update(id, dto);
 }

 @Delete(':id')
 remove(@Param('id') id: string) {
  return this.service.remove(id);
}

}
