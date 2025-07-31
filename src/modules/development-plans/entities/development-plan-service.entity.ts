import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DevelopmentPlan } from './development-plan.entity';
import { Service } from '../../services/entities/service.entity';

@Entity('development_plan_services')
export class DevelopmentPlanService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => DevelopmentPlan, (plan) => plan.service_links, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'development_plan_id' })
  development_plan: DevelopmentPlan;

  @ManyToOne(() => Service, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service: Service;
}