import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skill.entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from '../skills/dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepo: Repository<Skill>,
  ) {}

  async create(dto: CreateSkillDto): Promise<Skill> {
    const skill = this.skillRepo.create(dto);
    return this.skillRepo.save(skill);
  }

  async findAll(): Promise<Skill[]> {
    return this.skillRepo.find({ relations: ['employees'] });
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillRepo.findOne({ where: { id }, relations: ['employees'] });
    if (!skill) throw new NotFoundException('Skill not found');
    return skill;
  }

  async update(id: string, dto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.findOne(id);
    Object.assign(skill, dto);
    return this.skillRepo.save(skill);
  }

  async remove(id: string): Promise<void> {
    await this.skillRepo.delete(id);
  }
}
