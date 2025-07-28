import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { TaskCommentsService } from './task-comments.service';
import { CreateTaskCommentDto } from './dto/create-task-comment.dto';
import { UpdateTaskCommentDto } from './dto/update-task-comment.dto';

@Controller('task-comments')
export class TaskCommentsController {
  constructor(private readonly taskCommentsService: TaskCommentsService) {}

  @Post()
  create(@Body() dto: CreateTaskCommentDto) {
    return this.taskCommentsService.create(dto);
  }

  @Get()
  findAll() {
  return this.taskCommentsService.findAll();
}

  @Get(':id')
  findOne(@Param('id') id: string) {
  return this.taskCommentsService.findOne(id);
}

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskCommentDto) {
  return this.taskCommentsService.update(id, dto);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskCommentsService.remove(id);
  }

  @Get('task/:taskId')
  findByTask(@Param('taskId') taskId: string) {
    return this.taskCommentsService.findByTask(taskId);
  }
}
