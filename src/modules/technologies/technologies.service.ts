import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technology } from './entities/technology.entity';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';

@Injectable()
export class TechnologiesService {
  constructor(
    @InjectRepository(Technology)
    private readonly techRepo: Repository<Technology>,
  ) {}

  async create(dto: CreateTechnologyDto): Promise<Technology> {
    const tech = this.techRepo.create(dto);
    return this.techRepo.save(tech);
  }

  async findAll(): Promise<Technology[]> {
    return this.techRepo.find({ relations: ['projectTechnologies'] });
  }

  async findOne(id: string): Promise<Technology> {
    const tech = await this.techRepo.findOne({
      where: { id },
      relations: ['projectTechnologies'],
    });
    if (!tech) throw new NotFoundException('Technology not found');
    return tech;
  }

  async update(id: string, dto: UpdateTechnologyDto): Promise<Technology> {
    const tech = await this.findOne(id);
    Object.assign(tech, dto);
    return this.techRepo.save(tech);
  }

  async remove(id: string): Promise<void> {
    await this.techRepo.delete(id);
  }
}
