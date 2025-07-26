import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from '../projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { ProjectMember } from '../../project_member/entities/project_member.entity';
import { EmployeeProfile } from '../../employees/entities/employee_profile.entity';
import { Technology } from '../../technologies/entities/technology.entity';
import { ProjectTechnology } from '../../technologies/entities/project_technology.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockRepo = (): Partial<jest.Mocked<Repository<any>>> => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

describe('ProjectsService', () => {
  let service: ProjectsService;
  let projectRepo: jest.Mocked<Repository<Project>>;
  let memberRepo: jest.Mocked<Repository<ProjectMember>>;
  let employeeRepo: jest.Mocked<Repository<EmployeeProfile>>;
  let techRepo: jest.Mocked<Repository<Technology>>;
  let projTechRepo: jest.Mocked<Repository<ProjectTechnology>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: getRepositoryToken(Project), useFactory: mockRepo },
        { provide: getRepositoryToken(ProjectMember), useFactory: mockRepo },
        { provide: getRepositoryToken(EmployeeProfile), useFactory: mockRepo },
        { provide: getRepositoryToken(Technology), useFactory: mockRepo },
        { provide: getRepositoryToken(ProjectTechnology), useFactory: mockRepo },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    projectRepo = module.get(getRepositoryToken(Project));
    memberRepo = module.get(getRepositoryToken(ProjectMember));
    employeeRepo = module.get(getRepositoryToken(EmployeeProfile));
    techRepo = module.get(getRepositoryToken(Technology));
    projTechRepo = module.get(getRepositoryToken(ProjectTechnology));
  });

  it('should create a project', async () => {
    const dto = { name: 'New Project' };
    const project: Project = {
      id: '1',
      name: 'New Project',
      description: '',
      status: 'pending',
      startDate: null,
      endDate: null,
      members: [],
      technologies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    projectRepo.create.mockReturnValue(project);
    projectRepo.save.mockResolvedValue(project);

    expect(await service.create(dto)).toEqual(project);
  });

  it('should find all projects', async () => {
    const result: Project[] = [
      {
        id: '1',
        name: 'P1',
        description: '',
        status: 'pending',
        startDate: null,
        endDate: null,
        members: [],
        technologies: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    projectRepo.find.mockResolvedValue(result);

    expect(await service.findAll()).toEqual(result);
  });

  it('should throw if project not found', async () => {
    projectRepo.findOne.mockResolvedValue(null);
    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('should update a project', async () => {
    const existing: Project = {
      id: '1',
      name: 'Old',
      description: '',
      status: 'pending',
      startDate: null,
      endDate: null,
      members: [],
      technologies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updated: Project = {
      ...existing,
      name: 'Updated',
    };

    projectRepo.findOne.mockResolvedValue(existing);
    projectRepo.save.mockResolvedValue(updated);

    expect(await service.update('1', { name: 'Updated' })).toEqual(updated);
  });

  it('should remove a project', async () => {
    projectRepo.delete.mockResolvedValue({ affected: 1 } as any);
    await service.remove('1');

    expect(projectRepo.delete).toHaveBeenCalledWith('1');
  });

  it('should assign a member', async () => {
    const dto = { projectId: '1', employeeId: '2', roleOnProject: 'Dev' };

    const project: Project = {
      id: '1',
      name: 'Project',
      description: '',
      status: 'pending',
      startDate: null,
      endDate: null,
      members: [],
      technologies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const employee: EmployeeProfile = {
  id: '2',
  email: 'john@example.com',
  position: 'Developer',
  fullName: 'John Doe',
  bio: 'Experienced developer',
  skills: [],
  user: {} as any, 
  createdAt: new Date(),
  updatedAt: new Date(),
};


    const member: ProjectMember = {
      id: 'm1',
      project,
      employee,
      roleOnProject: 'Dev',
    };

    projectRepo.findOne.mockResolvedValue(project);
    employeeRepo.findOne.mockResolvedValue(employee);
    memberRepo.create.mockReturnValue(member);
    memberRepo.save.mockResolvedValue(member);

    expect(await service.assignMember(dto)).toEqual(member);
  });

  it('should assign technology', async () => {
    const project: Project = {
      id: '1',
      name: 'Project',
      description: '',
      status: 'pending',
      startDate: null,
      endDate: null,
      members: [],
      technologies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const tech: Technology = {
      id: '2',
      name: 'Node.js',
      description: '',
      projectTechnologies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const link: ProjectTechnology = {
      id: 'pt1',
      project,
      technology: tech,
    };

    projectRepo.findOne.mockResolvedValue(project);
    techRepo.findOne.mockResolvedValue(tech);
    projTechRepo.create.mockReturnValue(link);
    projTechRepo.save.mockResolvedValue(link);

    expect(await service.assignTechnology('1', '2')).toEqual(link);
  });
});
