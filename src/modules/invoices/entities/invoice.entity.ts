import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { ClientPlanQuotation } from '../../quotations/entities/client_plan_quotation.entity'; 
import { InvoiceItem } from './invoice_item.entity'; 
@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Client, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => ClientPlanQuotation, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'quotation_id' })
  quotation?: ClientPlanQuotation;

  @Column()
  invoice_number: string;

  @Column({ type: 'date' })
  issue_date: string;

  @Column({ type: 'date' })
  due_date: string;

  @Column()
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total_amount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  amount_paid: number;

  @OneToMany(() => InvoiceItem, (item) => item.invoice)
  items: InvoiceItem[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
