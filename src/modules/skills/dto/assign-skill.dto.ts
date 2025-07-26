import { IsUUID } from 'class-validator';

export class AssignSkillDto {
  @IsUUID()
  employeeId: string;

  @IsUUID()
  skillId: string;
}
