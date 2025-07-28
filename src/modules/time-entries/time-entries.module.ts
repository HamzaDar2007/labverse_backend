import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeEntry } from './../time-entries/entities/time_entry.entity';
import { TimeEntriesService } from './time-entries.service';
import { TimeEntriesController } from './time-entries.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TimeEntry])],
  providers: [TimeEntriesService],
  controllers: [TimeEntriesController],
})
export class TimeEntriesModule {}
