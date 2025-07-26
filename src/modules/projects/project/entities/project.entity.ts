import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, OneToMany
} from 'typeorm';
import { ProjectMember } from './../../project_member/entities/project_member.entity';
import { ProjectTechnology } from '../../../technologies/entities/project_technology.entity';
import { ProjectUpdate } from '../../project_updates/entities/project-update.entity';
import { ProjectMilestone } from '../../project_milestones/entities/project-milestone.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'date', nullable: true })
  startDate: string;

  @Column({ type: 'date', nullable: true })
  endDate: string;

  @OneToMany(() => ProjectMember, (pm) => pm.project)
  members: ProjectMember[];
  
  // @OneToMany(() => ProjectUpdate, (update) => update.project, { cascade: true })
  // updates: ProjectUpdate[];
  
  @OneToMany(() => ProjectMilestone, (milestone) => milestone.project, { cascade: true })
  milestones: ProjectMilestone[];
  
  @OneToMany(() => ProjectTechnology, (pt) => pt.project)
  technologies: ProjectTechnology[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
