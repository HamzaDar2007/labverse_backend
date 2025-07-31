import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Invoice } from '../../invoices/entities/invoice.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Invoice, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'invoice_id' })
  invoice: Invoice;

  @Column('decimal', { precision: 10, scale: 2 })
  amount_paid: number;

  @Column()
  payment_method: string;

  @Column({ nullable: true })
  payment_reference?: string;

  @Column({ type: 'date' })
  payment_date: string;

  @Column({ nullable: true })
  note?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}