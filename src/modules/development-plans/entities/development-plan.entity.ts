import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DevelopmentPlanFeature } from './development-plan-feature.entity';
import { DevelopmentPlanService } from './development-plan-service.entity';
import { DevelopmentPlanTechnology } from './development-plan-technology.entity';

@Entity('development_plans')
export class DevelopmentPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  estimated_duration?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  base_price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => DevelopmentPlanFeature, (rel) => rel.development_plan)
  feature_links: DevelopmentPlanFeature[];

  @OneToMany(() => DevelopmentPlanService, (rel) => rel.development_plan)
  service_links: DevelopmentPlanService[];

  @OneToMany(() => DevelopmentPlanTechnology, (rel) => rel.development_plan)
  technology_links: DevelopmentPlanTechnology[];



}
