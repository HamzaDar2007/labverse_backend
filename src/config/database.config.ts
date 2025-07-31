
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// ✅ Import all entities manually
import { Role } from '../modules/roles/entities/role.entity';
import { User } from '../modules/users/entities/user.entity';
import { Skill } from '../modules/skills/entities/skill.entity';
import { EmployeeProfile } from '../modules/employees/entities/employee_profile.entity';
import { Technology } from '../modules/technologies/entities/technology.entity';
import { Project } from '../modules/projects/project/entities/project.entity';
import { ProjectMember } from '../modules/projects/project_member/entities/project_member.entity';
import { ProjectTechnology } from '../modules/technologies/entities/project_technology.entity';
import { ProjectMilestone } from '../modules/projects/project_milestones/entities/project-milestone.entity';
import { ProjectUpdate } from '../modules/projects/project_updates/entities/project-update.entity';
import { Task } from '../modules/tasks/entities/task.entity';
import { TaskComment } from '../modules/task-comments/entities/task-comment.entity';
import { DevelopmentPlanTechnology } from '../modules/development-plans/entities/development-plan-technology.entity';
import { DevelopmentPlan } from '../modules/development-plans/entities/development-plan.entity';
import { DevelopmentPlanFeature } from 'src/modules/development-plans/entities/development-plan-feature.entity'; 
import { DevelopmentPlanService } from '../modules/development-plans/entities/development-plan-service.entity';
import { PlanFeature } from '../modules/development-plans/entities/plan-feature.entity';
import { Service } from '../modules/services/entities/service.entity';
import { Invoice } from '../modules/invoices/entities/invoice.entity';
import { InvoiceItem } from '../modules/invoices/entities/invoice_item.entity';
import { Payment } from '../modules/payments/entities/payment.entity'; 
import { Client } from '../modules/clients/entities/client.entity';
import { TimeEntry } from '../modules/time-entries/entities/time_entry.entity';
import { ClientPlanQuotation } from '../modules/quotations/entities/client_plan_quotation.entity';
import { QuotationsModule } from '../modules/quotations/quotations.module';

dotenv.config();

const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'postgres',

  // ✅ Explicit entity list for reliability
  entities: [
    Role,
    User,
    Skill,
    EmployeeProfile,
    Technology,
    Project,
    ProjectMember,
    ProjectTechnology,
    ProjectMilestone,
    ProjectUpdate,
    Task,
    TaskComment,
    TimeEntry,
    DevelopmentPlanTechnology,
    DevelopmentPlan,
    DevelopmentPlanFeature,
    DevelopmentPlanService, 
    PlanFeature,
    Service,
    Invoice,  
    InvoiceItem,
    Payment,
    Client,
    ClientPlanQuotation,
    QuotationsModule
  ],

  // Migrations path
  migrations: [__dirname + '/../../migrations/*.{ts,js}'],

  // Migration mode only in production
  synchronize: false,

  logging: process.env.TYPEORM_LOGGING === 'true',

  namingStrategy: new SnakeNamingStrategy(),
});

export default databaseConfig;
