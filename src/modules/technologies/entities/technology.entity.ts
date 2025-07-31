import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, OneToMany
} from 'typeorm';
import { ProjectTechnology } from './project_technology.entity';
import { DevelopmentPlanTechnology } from '../../development-plans/entities/development-plan-technology.entity';
@Entity('technologies')
export class Technology {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => ProjectTechnology, (pt) => pt.technology)
  projectTechnologies: ProjectTechnology[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

 @OneToMany(() => DevelopmentPlanTechnology, (dpt) => dpt.technology)
  developmentPlanTechnologies: DevelopmentPlanTechnology[];
}
