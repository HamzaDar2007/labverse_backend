import 'reflect-metadata';
import { AppDataSource } from '../src/config/data-source';
import { Role } from '../src/modules/roles/entities/role.entity';
import { RoleEnum } from '../src/modules/roles/role.enum';
import { User } from '../src/modules/users/entities/user.entity';
import { Skill } from '../src/modules/skills/entities/skill.entity';
import { EmployeeProfile } from '../src/modules/employees/entities/employee_profile.entity';
import { Technology } from '../src/modules/technologies/entities/technology.entity';
import { Project } from '../src/modules/projects/project/entities/project.entity';
import { ProjectMember } from '../src/modules/projects/project_member/entities/project_member.entity';
import { ProjectTechnology } from '../src/modules/technologies/entities/project_technology.entity';
import { ProjectMilestone } from '../src/modules/projects/project_milestones/entities/project-milestone.entity';
import { Task } from '../src/modules/tasks/entities/task.entity'; 
import { TaskComment } from '../src/modules/task-comments/entities/task-comment.entity'; 
import { TimeEntry } from '../src/modules/time-entries/entities/time_entry.entity'; 
import * as bcrypt from 'bcryptjs';

async function seed() {
  await AppDataSource.initialize();

  const roleRepo = AppDataSource.getRepository(Role);
  const userRepo = AppDataSource.getRepository(User);
  const skillRepo = AppDataSource.getRepository(Skill);
  const employeeRepo = AppDataSource.getRepository(EmployeeProfile);
  const techRepo = AppDataSource.getRepository(Technology);
  const projectRepo = AppDataSource.getRepository(Project);
  const memberRepo = AppDataSource.getRepository(ProjectMember);
  const projTechRepo = AppDataSource.getRepository(ProjectTechnology);
  const milestoneRepo = AppDataSource.getRepository(ProjectMilestone);
  const taskRepo = AppDataSource.getRepository(Task);
  const commentRepo = AppDataSource.getRepository(TaskComment);
  const timeEntryRepo = AppDataSource.getRepository(TimeEntry);
  const taskCommentRepo = AppDataSource.getRepository(TaskComment); 

  console.log('🌱 Seeding database...');

  // Roles
  const rolesToSeed = [
    { name: RoleEnum.ADMIN, description: 'Administrator with full access' },
    { name: RoleEnum.USER, description: 'Default user' },
    { name: RoleEnum.CLIENT, description: 'Client user' },
  ];

  for (const roleData of rolesToSeed) {
    let role = await roleRepo.findOne({ where: { name: roleData.name } });
    if (!role) {
      role = roleRepo.create(roleData);
      await roleRepo.save(role);
      console.log(`✅ Role "${roleData.name}" created.`);
    } else {
      console.log(`ℹ️ Role "${roleData.name}" already exists.`);
    }
  }

  // Admin user
  const adminEmail = 'admin@labverse.org';
  let adminUser = await userRepo.findOne({ where: { email: adminEmail } });
  if (!adminUser) {
    const adminRole = await roleRepo.findOne({ where: { name: RoleEnum.ADMIN } });
    const password = await bcrypt.hash('Admin@12345', 10);
    adminUser = userRepo.create({
      email: adminEmail,
      password,
      fullName: 'Super Admin',
      role: adminRole,
    });
    await userRepo.save(adminUser);
    console.log(`✅ Admin user "${adminEmail}" created`);
  } else {
    console.log(`ℹ️ Admin user "${adminEmail}" already exists`);
  }

  // Skills
  const skillNames = ['NestJS', 'React', 'PostgreSQL'];
  const skills = [];
  for (const name of skillNames) {
    let skill = await skillRepo.findOne({ where: { name } });
    if (!skill) {
      skill = skillRepo.create({ name });
      skill = await skillRepo.save(skill);
      console.log(`✅ Skill "${name}" created`);
    } else {
      console.log(`ℹ️ Skill "${name}" already exists`);
    }
    skills.push(skill);
  }

  // Technologies
  const techNames = ['TypeScript', 'Docker', 'AWS'];
  const technologies = [];
  for (const name of techNames) {
    let tech = await techRepo.findOne({ where: { name } });
    if (!tech) {
      tech = techRepo.create({ name });
      tech = await techRepo.save(tech);
      console.log(`✅ Technology "${name}" created`);
    } else {
      console.log(`ℹ️ Technology "${name}" already exists`);
    }
    technologies.push(tech);
  }

  // Employees
  const employees = await employeeRepo.save([
    {
      fullName: 'Hamza Iftikhar',
      email: 'hamza@labverse.com',
      position: 'Backend Developer',
      bio: 'Handles backend services and APIs',
      skills: [skills[0], skills[2]],
    },
    {
      fullName: 'Umer Shehzad',
      email: 'umer@labverse.com',
      position: 'Frontend Developer',
      bio: 'Frontend expert in React and Tailwind',
      skills: [skills[1]],
    },
  ]);
  console.log('✅ Employees seeded');

  // Project
  const project = await projectRepo.save({
    name: 'Labverse Platform',
    description: 'Main internal project for managing Labverse',
    status: 'active',
    startDate: '2024-06-01',
    endDate: '2024-12-31',
  });
  console.log('✅ Project seeded');

  // Project Members
  await memberRepo.save([
    {
      project,
      employee: employees[0],
      roleOnProject: 'Backend Lead',
    },
    {
      project,
      employee: employees[1],
      roleOnProject: 'Frontend Engineer',
    },
  ]);
  console.log('✅ Project members assigned');

  // Project Technologies
  await projTechRepo.save([
    { project, technology: technologies[0] },
    { project, technology: technologies[2] },
  ]);
  console.log('✅ Technologies linked to project');

  // Milestone
  const milestone = milestoneRepo.create({
    title: 'MVP Delivery',
    description: 'Initial MVP delivery phase',
    due_date: new Date('2024-11-01'),
    project,
  });
  await milestoneRepo.save(milestone);
  console.log('✅ Project milestone created');

  // Tasks
  const task1 = taskRepo.create({
    title: 'Create API for Task Module',
    description: 'Implement CRUD logic',
    status: 'in_progress',
    priority: 'high',
    assigned_to: employees[0],
    milestone,
    project,
  });
  const task2 = taskRepo.create({
    title: 'UI Design for Time Tracking',
    description: 'Use Tailwind for dashboard UI',
    status: 'pending',
    priority: 'medium',
    assigned_to: employees[1],
    milestone,
    project,
  });
  await taskRepo.save([task1, task2]);
  console.log('✅ Tasks created');

  // Task Comments
  const comment = commentRepo.create({
    task: task1,
    author: employees[0],
    comment: 'Started implementing controller and service.',
  });
  await commentRepo.save(comment);
  console.log('✅ Task comment added');

  // Time Entry
const timeEntry = timeEntryRepo.create({
  project_id: project.id,
  task_id: task1.id,
  employee_id: employees[0].id,
  start_time: new Date(),
  end_time: new Date(Date.now() + 1000 * 60 * 60), // 1 hour later
  duration_hours: 1,
  billed_amount: 100,
});
await timeEntryRepo.save(timeEntry);

  console.log('✅ Time entry added');

  console.log('🎉 All seeding completed successfully!');
  await AppDataSource.destroy();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});
