import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { SkillsModule } from './modules/skills/skills.module';
import { TechnologiesModule } from './modules/technologies/technologies.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { EmployeesModule } from './modules/employees/employees.module';
import { ProjectsModule } from './modules/projects/project/projects.module';
import { ProjectMemberModule } from './modules/projects/project_member/project_member.module';
import { ProjectTechnologyModule } from './modules/projects/project_technologies/project_technology.module';
import { ProjectMilestonesModule } from './modules/projects/project_milestones/project_milestones.module';
import { ProjectUpdatesModule } from './modules/projects/project_updates/project_updates.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { TaskCommentsModule } from './modules/task-comments/task-comments.module';
import { TimeEntriesModule } from './modules/time-entries/time-entries.module';
import { ClientsModule } from './modules/clients/clients.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { DevelopmentPlansModule } from './modules/development-plans/development-plans.module';import { ClientPlanQuotation } from './modules/quotations/entities/client_plan_quotation.entity';
import { QuotationsModule } from './modules/quotations/quotations.module';
import { ServicesModule } from './modules/services/services.module';
import { PaymentsModule } from './modules/payments/payments.module'; 
import { Invoice } from './modules/invoices/entities/invoice.entity';
import { DevelopmentPlanFeature } from './modules/development-plans/entities/development-plan-feature.entity'
import { DevelopmentPlanFeatureModule } from './modules/development-plans/development-plan-feature.module';
import { DevelopmentPlanServiceModule } from './modules/development-plans/development-plan-service.module';
import { DevelopmentPlanTechnologyModule } from './modules/development-plans/development-plan-technology.module';
import { PlanFeatureModule } from './modules/development-plans/plan-feature.module'; 
import { InvoiceItemsModule } from './modules/invoice_items/invoice-items.module'; 
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    SkillsModule,
    TechnologiesModule,
    EmployeesModule,
    ProjectsModule,
    ProjectMemberModule,
    ProjectTechnologyModule,
    ProjectMilestonesModule,
    ProjectUpdatesModule,
    TasksModule,
    TaskCommentsModule,
    TimeEntriesModule,
    ClientsModule,
    InvoicesModule,
    DevelopmentPlansModule,
    QuotationsModule,
    ServicesModule,
    PaymentsModule,
    InvoicesModule,
    Invoice,
    PlanFeatureModule,
    DevelopmentPlanFeature,
    DevelopmentPlanFeatureModule,
    DevelopmentPlanServiceModule,
    DevelopmentPlanTechnologyModule,
    ClientsModule,
    InvoiceItemsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
