import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  create(dto: CreateTaskDto) {
    const task = this.taskRepository.create({
      ...dto,
      project: { id: dto.project_id },
      assigned_to: dto.assigned_to_id ? { id: dto.assigned_to_id } : undefined,
      milestone: dto.milestone_id ? { id: dto.milestone_id } : undefined,
    });

    return this.taskRepository.save(task);
  }

  findAll() {
    return this.taskRepository.find({
      relations: ['assigned_to', 'project', 'milestone'],
    });
  }

  findOne(id: string) {
    return this.taskRepository.findOne({
      where: { id },
      relations: ['assigned_to', 'project', 'milestone'],
    });
  }

  async update(id: string, dto: UpdateTaskDto) {
    const { assignee_id, milestone_id, ...rest } = dto;

    const updateData: any = { ...rest };

    if (assignee_id) {
      updateData.assigned_to = { id: assignee_id };
    }

    if (milestone_id) {
      updateData.milestone = { id: milestone_id };
    }

    await this.taskRepository.update(id, updateData);
    return this.findOne(id); // ✅ return the full updated task
  }

  remove(id: string) {
    return this.taskRepository.delete(id);
  }
  findByProject(projectId: string) {
    return this.taskRepository.find({
      where: { project: { id: projectId } },
      relations: ['assigned_to','project', 'milestone'],
    });
  }

  findByEmployee(employeeId: string) {
    return this.taskRepository.find({
      where: { assigned_to: { id: employeeId } },
      relations: ['assigned_to', 'project', 'milestone'],
    });
  }

}
