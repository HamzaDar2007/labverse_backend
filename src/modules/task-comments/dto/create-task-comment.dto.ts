import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateTaskCommentDto {
  @IsUUID()
  task_id: string;

  @IsUUID()
  author_id: string;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
