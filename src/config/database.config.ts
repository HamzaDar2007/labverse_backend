// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import * as dotenv from 'dotenv';
// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// dotenv.config();

// const databaseConfig = (): TypeOrmModuleOptions => ({
//   type: 'postgres',
//   host: process.env.DB_HOST || 'localhost',
//   port: parseInt(process.env.DB_PORT || '5432', 10),
//   username: process.env.DB_USERNAME || 'postgres',
//   password: process.env.DB_PASSWORD || '',
//   database: process.env.DB_DATABASE || 'postgres',

//   // This matches all .entity.ts/.js files inside all modules/entities folders
//   entities: [__dirname + '/../modules/**/entities/*.entity.{ts,js}'],

//   // This matches migration files in root/migrations folder
//   migrations: [__dirname + '/../../migrations/*.{ts,js}'],

//   // Always use migrations in production!
//   synchronize: false,

//   logging: process.env.TYPEORM_LOGGING === 'true',

//   // Use snake_case everywhere in DB
//   namingStrategy: new SnakeNamingStrategy(),

//   // SSL config (uncomment for production if needed)
//   // ssl: process.env.DB_SSL === 'true',
//   // extra: {
//   //   ssl: process.env.DB_SSL === 'true'
//   //     ? { rejectUnauthorized: false }
//   //     : undefined,
//   // },

//   // Connection pool example (uncomment and tune for prod)
//   // extra: {
//   //   max: 10, // max connections
//   //   min: 2,
//   // },
// });

// export default databaseConfig;


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


import { TimeEntry } from '../modules/time-entries/entities/time_entry.entity';

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
  ],

  // Migrations path
  migrations: [__dirname + '/../../migrations/*.{ts,js}'],

  // Migration mode only in production
  synchronize: false,

  logging: process.env.TYPEORM_LOGGING === 'true',

  namingStrategy: new SnakeNamingStrategy(),
});

export default databaseConfig;
