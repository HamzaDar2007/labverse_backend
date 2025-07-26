// import { IsString, IsUUID, IsOptional, IsDateString } from 'class-validator';

// export class CreateProjectUpdateDto {
//   @IsUUID()
//   project_id: string;

//   @IsString()
//   title: string;

//   @IsString()
//   content: string;

//   @IsOptional()
//   @IsDateString()
//   update_date?: string; // Optional override of default timestamp
// }
import { IsUUID, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateProjectUpdateDto {
  @IsUUID()
  milestone_id: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsDateString()
  update_date?: string;
}
