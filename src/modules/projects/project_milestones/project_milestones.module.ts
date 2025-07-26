import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';    
import { ProjectMilestonesController } from './project_milestones.controller';
import { ProjectMilestonesService } from './project_milestones.service';
import { ProjectMilestone } from './entities/project-milestone.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ProjectMilestone])],
  controllers: [ProjectMilestonesController],
  providers: [ProjectMilestonesService],
})
export class ProjectMilestonesModule {}
