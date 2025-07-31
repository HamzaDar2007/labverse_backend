import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany
} from 'typeorm';
import { ClientPlanQuotation } from '../../quotations/entities/client_plan_quotation.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ClientPlanQuotation, (q) => q.client)
  quotations: ClientPlanQuotation[];

  @OneToMany(() => Invoice, (inv) => inv.client)
  invoices: Invoice[];
}
