import { Module } from '@nestjs/common';
import { ProjectMemberController } from './project_member.controller';
import { ProjectMemberService } from './project_member.service';

@Module({
  controllers: [ProjectMemberController],
  providers: [ProjectMemberService],
})
export class ProjectMemberModule {}
