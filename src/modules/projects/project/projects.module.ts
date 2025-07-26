import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { ProjectMember } from '../project_member/entities/project_member.entity';
import { ProjectTechnology } from '../../technologies/entities/project_technology.entity';
import { EmployeeProfile } from '../../employees/entities/employee_profile.entity';
import { Technology } from '../../technologies/entities/technology.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      ProjectMember,
      ProjectTechnology,
      EmployeeProfile,
      Technology,
    ]),
  ],
  exports: [TypeOrmModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
