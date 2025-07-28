import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn
} from 'typeorm';
import { EmployeeProfile } from '../../../modules/employees/entities/employee_profile.entity'; 
import { Project } from '../../../modules/projects/project/entities/project.entity'; 
import { ProjectMilestone } from '../../../modules/projects/project_milestones/entities/project-milestone.entity';
import { IsOptional, IsUUID } from 'class-validator';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ default: 'pending' })
  status: string;

  @Column({ default: 'normal' })
  priority: string;

  @ManyToOne(() => EmployeeProfile, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assigned_to_id' })
  assigned_to?: EmployeeProfile;

  @ManyToOne(() => Project, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => ProjectMilestone, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'milestone_id' })
  milestone?: ProjectMilestone;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @IsOptional()
  @IsUUID()
assigned_to_id?: string;

}
