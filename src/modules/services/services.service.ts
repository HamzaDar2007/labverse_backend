import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity'; 
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto'; 

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepo: Repository<Service>,
  ) {}

  create(dto: CreateServiceDto) {
    const service = this.serviceRepo.create(dto);
    return this.serviceRepo.save(service);
  }

  findAll() {
    return this.serviceRepo.find();
  }

  async findOne(id: string) {
    const service = await this.serviceRepo.findOneBy({ id });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async update(id: string, dto: UpdateServiceDto) {
    await this.findOne(id);
    await this.serviceRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const service = await this.findOne(id);
    return this.serviceRepo.remove(service);
  }
}
