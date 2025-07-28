// src/modules/task-comments/dto/update-task-comment.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskCommentDto {
  @IsOptional()
  @IsString()
  comment?: string;
}
