import {
  Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { Technology } from '../../technologies/entities/technology.entity';

@Entity('project_technologies')
export class ProjectTechnology {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.technologies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Technology, (tech) => tech.projectTechnologies, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'technology_id' })
  technology: Technology;
}
