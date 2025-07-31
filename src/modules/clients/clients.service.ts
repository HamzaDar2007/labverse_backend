import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
  ) {}

  create(dto: CreateClientDto) {
    const client = this.clientRepo.create(dto);
    return this.clientRepo.save(client);
  }

  findAll() {
    return this.clientRepo.find();
  }

  findOne(id: string) {
    return this.clientRepo.findOneByOrFail({ id });
  }

  async update(id: string, dto: UpdateClientDto) {
    const client = await this.findOne(id);
    Object.assign(client, dto);
    return this.clientRepo.save(client);
  }

async remove(id: string) {
  const client = await this.clientRepo.findOne({ where: { id } });

  if (!client) {
    throw new NotFoundException(`Client with ID ${id} not found.`);
  }

  return this.clientRepo.remove(client);
}
}
