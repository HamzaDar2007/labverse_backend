import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeEntry } from './../time-entries/entities/time_entry.entity';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';
import { UpdateTimeEntryDto } from './dto/update-time-entry.dto';

@Injectable()
export class TimeEntriesService {
  constructor(
    @InjectRepository(TimeEntry)
    private repo: Repository<TimeEntry>,
  ) {}

  async create(dto: CreateTimeEntryDto) {
    const entry = this.repo.create(dto);
    return this.repo.save(entry);
  }

  async findByTask(taskId: string) {
    return this.repo.find({
      where: { task: { id: taskId } },
      relations: ['project', 'task', 'employee'],
    });
  }

  findAll() {
    return this.repo.find({ relations: ['project', 'task', 'employee'] });
  }

  async findOne(id: string) {
    const entry = await this.repo.findOne({
      where: { id },
      relations: ['project', 'task', 'employee'],
    });
    if (!entry) throw new NotFoundException('Time entry not found');
    return entry;
  }

  async update(id: string, dto: UpdateTimeEntryDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.repo.delete(id);
    return { message: 'Time entry removed' };
  }

async findByEmployee(employeeId: string) {
  return this.repo.find({
    where: { employee: { id: employeeId } },
    relations: ['employee', 'task', 'project'],
  });
}

async findByProject(projectId: string) {
  return this.repo.find({
    where: { project: { id: projectId } },
    relations: ['employee', 'task', 'project'],
  });
}
}
