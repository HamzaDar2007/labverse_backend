import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from '../../projects/project/entities/project.entity';
import { Task } from '../../tasks/entities/task.entity';
import { EmployeeProfile } from '../../employees/entities/employee_profile.entity';

@Entity('time_entries')
export class TimeEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  project_id: string;

  @Column()
  task_id: string;

  @Column()
  employee_id: string;
  
  @Column()
  start_time: Date;

  @Column()
  end_time: Date;

  @Column('float')
  duration_hours: number;

  @Column({ type: 'float', nullable: true })
  billed_amount: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Project, (project) => project.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => Task, (task) => task.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @ManyToOne(() => EmployeeProfile, (emp) => emp.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee: EmployeeProfile;
}
