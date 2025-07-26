import { IsUUID } from 'class-validator';

export class AssignProjectTechnologyDto {
  @IsUUID()
  projectId: string;

  @IsUUID()
  technologyId: string;
}
