import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskComment } from './entities/task-comment.entity'; 
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { UpdateTaskCommentDto } from './dto/update-task-comment.dto';

@Injectable()
export class TaskCommentsService {
  constructor(
    @InjectRepository(TaskComment)
    private readonly commentRepo: Repository<TaskComment>,
  ) {}

  create(dto: CreateTaskCommentDto) {
  const comment = this.commentRepo.create({
    comment: dto.comment,
    task: { id: dto.task_id },      // relation mapping
    author: { id: dto.author_id }   // relation mapping
  });

  return this.commentRepo.save(comment);
}

  findAll() {
    return this.commentRepo.find({ relations: ['task', 'author'] });
  }
  
  
  async findOne(id: string) {
  return this.commentRepo.findOne({
    where: { id },
    relations: ['author', 'task'],
  });
}

  async update(id: string, dto: UpdateTaskCommentDto) {
  const comment = await this.commentRepo.findOne({ where: { id } });
  if (!comment) throw new Error('Comment not found');
  Object.assign(comment, dto);
  return this.commentRepo.save(comment);
}
  remove(id: string) {
    return this.commentRepo.delete(id);
  }

  findByTask(taskId: string) {
    return this.commentRepo.find({
      where: { task: { id: taskId } },
      relations: ['author'],
    });
  }
}
