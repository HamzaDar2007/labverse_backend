import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DevelopmentPlan } from './development-plan.entity';
import { PlanFeature } from './plan-feature.entity';

@Entity('development_plan_features')
export class DevelopmentPlanFeature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DevelopmentPlan, (plan) => plan.feature_links, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'development_plan_id' })
  development_plan: DevelopmentPlan;

  @ManyToOne(() => PlanFeature, (feature) => feature.development_plan_links, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'feature_id' })
  feature: PlanFeature;
}
