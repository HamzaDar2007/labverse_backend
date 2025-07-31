import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity'; 
import { CreatePaymentDto } from './dto/create-payment.dto'; 
import { UpdatePaymentDto } from './dto/update-payment.dto'; 

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
  ) {}

  create(dto: CreatePaymentDto) {
    const payment = this.paymentRepo.create(dto);
    return this.paymentRepo.save(payment);
  }

  findAll() {
    return this.paymentRepo.find({ relations: ['invoice'] });
  }

  async findOne(id: string) {
    const payment = await this.paymentRepo.findOne({ where: { id }, relations: ['invoice'] });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async update(id: string, dto: UpdatePaymentDto) {
    await this.findOne(id);
    await this.paymentRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const payment = await this.findOne(id);
    return this.paymentRepo.remove(payment);
  }
}
