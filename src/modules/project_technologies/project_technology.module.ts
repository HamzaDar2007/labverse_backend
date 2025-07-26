import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTechnology } from '../technologies/entities/project_technology.entity';
import { ProjectTechnologyService } from './project_technology.service';
import { ProjectTechnologyController } from './project_technology.controller';
import { Project } from '../project/entities/project.entity';
import { Technology } from '../technologies/entities/technology.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectTechnology,
      Project,
      Technology,
    ]),
  ],
  providers: [ProjectTechnologyService],
  controllers: [ProjectTechnologyController],
})
export class ProjectTechnologyModule {}
