import { IsArray, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateEmployeeProfileDto {
  @IsString()
  fullName: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUUID()
  userId?: string;
 
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  skillIds?: string[];

}
