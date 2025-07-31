import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DevelopmentPlan } from '../../development-plans/entities/development-plan.entity';
import { Client } from '../../clients/entities/client.entity';

@Entity('client_plan_quotations')
export class ClientPlanQuotation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => DevelopmentPlan, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'development_plan_id' })
  development_plan?: DevelopmentPlan;

  @Column({ nullable: true })
  custom_note?: string;

  @Column({ default: 'draft' })
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  quotation_total: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
