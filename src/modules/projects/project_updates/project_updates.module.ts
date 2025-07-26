import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectUpdate } from './entities/project-update.entity';
import { ProjectUpdatesService } from './project_updates.service';
import { ProjectUpdatesController } from './project_updates.controller';
import { Project } from '../project/entities/project.entity'; // Needed for relations

@Module({
  imports: [TypeOrmModule.forFeature([ProjectUpdate, Project])],
  controllers: [ProjectUpdatesController],
  providers: [ProjectUpdatesService],
})
export class ProjectUpdatesModule {}
