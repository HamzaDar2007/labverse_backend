// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   CreateDateColumn,
//   UpdateDateColumn,
//   JoinColumn,
// } from 'typeorm';
// import { Project } from '../../project/entities/project.entity';

// @Entity('project_updates')
// export class ProjectUpdate {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ManyToOne(() => Project, (project) => project.updates, { onDelete: 'CASCADE' })
//   @JoinColumn({ name: 'project_id' })
//   project: Project;

//   @Column()
//   title: string;

//   @Column('text')
//   content: string;

//   @Column({ type: 'timestamp', nullable: true })
//    update_date: Date;


// //   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
// //   update_date: Date;

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;
// }

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectMilestone } from '../../project_milestones/entities/project-milestone.entity';

@Entity('project_updates')
export class ProjectUpdate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  milestone_id: string;

  @ManyToOne(() => ProjectMilestone, (milestone) => milestone.updates, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'milestone_id' })
  milestone: ProjectMilestone;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'timestamp', nullable: true })
  update_date?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
