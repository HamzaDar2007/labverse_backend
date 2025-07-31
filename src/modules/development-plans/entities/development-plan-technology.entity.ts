import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DevelopmentPlan } from './development-plan.entity';
import { Technology } from '../../technologies/entities/technology.entity';

@Entity('development_plan_technologies')
export class DevelopmentPlanTechnology {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DevelopmentPlan, (plan) => plan.technology_links, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'development_plan_id' })
  development_plan: DevelopmentPlan;

  @ManyToOne(() => Technology, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'technology_id' })
  technology: Technology;
}
