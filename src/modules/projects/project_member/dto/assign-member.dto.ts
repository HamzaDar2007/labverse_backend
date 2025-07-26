import { IsUUID, IsString, MaxLength, maxLength } from 'class-validator';

export class AssignMemberDto {
  @IsUUID()
  projectId: string;

  @IsUUID()
  employeeId: string;

  @IsString()
  @MaxLength(100)
  roleOnProject: string;
}
