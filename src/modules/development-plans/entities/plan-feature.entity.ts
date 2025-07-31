import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { DevelopmentPlanFeature } from './development-plan-feature.entity';

@Entity('plan_features')
export class PlanFeature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string; 

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

@OneToMany(
    () => DevelopmentPlanFeature,
    (dpFeature) => dpFeature.feature
  )
  development_plan_links: DevelopmentPlanFeature[];

}
