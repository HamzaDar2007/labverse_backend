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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
