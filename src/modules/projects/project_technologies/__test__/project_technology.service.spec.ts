import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTechnologyService } from '../project_technology.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectTechnology } from '../../../technologies/entities/project_technology.entity';
import { Project } from '../../project/entities/project.entity';
import { Technology } from '../../../technologies/entities/technology.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockRepo = () => ({
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('ProjectTechnologyService', () => {
  let service: ProjectTechnologyService;
  let projectTechRepo: jest.Mocked<Repository<ProjectTechnology>>;
  let projectRepo: jest.Mocked<Repository<Project>>;
  let techRepo: jest.Mocked<Repository<Technology>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectTechnologyService,
        { provide: getRepositoryToken(ProjectTechnology), useFactory: mockRepo },
        { provide: getRepositoryToken(Project), useFactory: mockRepo },
        { provide: getRepositoryToken(Technology), useFactory: mockRepo },
      ],
    }).compile();

    service = module.get(ProjectTechnologyService);
    projectTechRepo = module.get(getRepositoryToken(ProjectTechnology));
    projectRepo = module.get(getRepositoryToken(Project));
    techRepo = module.get(getRepositoryToken(Technology));
  });

  it('should assign technology to project', async () => {
    const dto = { projectId: 'p1', technologyId: 't1' };

    const project = {
      id: 'p1',
      name: 'Test Project',
      description: 'desc',
      status: 'active',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      members: [],
      technologies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const tech = {
      id: 't1',
      name: 'Tech 1',
      description: 'desc',
      projectTechnologies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const link = { id: 'l1', project, technology: tech };

    projectRepo.findOneBy.mockResolvedValue(project as any);
    techRepo.findOneBy.mockResolvedValue(tech as any);
    projectTechRepo.create.mockReturnValue(link as any);
    projectTechRepo.save.mockResolvedValue(link as any);

    const result = await service.assignTechnologyToProject(dto);
    expect(result).toEqual(link);
  });

  it('should throw if project not found', async () => {
    projectRepo.findOneBy.mockResolvedValue(null);
    await expect(
      service.assignTechnologyToProject({ projectId: 'p1', technologyId: 't1' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should get all links', async () => {
    const links = [{ id: '1' }];
    projectTechRepo.find.mockResolvedValue(links as any);
    expect(await service.getAllLinks()).toEqual(links);
  });

  it('should get link by id', async () => {
    const link = { id: '1' };
    projectTechRepo.findOne.mockResolvedValue(link as any);
    expect(await service.getLinkById('1')).toEqual(link);
  });

  it('should update link', async () => {
    const link = { id: '1', project: {}, technology: {} };

    const project = {
      id: 'p1',
      name: 'Updated Project',
      description: 'desc',
      status: 'active',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      members: [],
      technologies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const tech = {
      id: 't1',
      name: 'Updated Tech',
      description: 'desc',
      projectTechnologies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const dto = { projectId: 'p1', technologyId: 't1' };

    projectTechRepo.findOne.mockResolvedValue(link as any);
    projectRepo.findOneBy.mockResolvedValue(project as any);
    techRepo.findOneBy.mockResolvedValue(tech as any);
    projectTechRepo.save.mockResolvedValue({ ...link, project, technology: tech });

    const result = await service.updateLink('1', dto);
    expect(result.project).toEqual(project);
    expect(result.technology).toEqual(tech);
  });

  it('should remove link', async () => {
    const link = { id: '1' };
    projectTechRepo.findOne.mockResolvedValue(link as any);
    projectTechRepo.remove.mockResolvedValue(link as any);

    const result = await service.removeLink('1');
    expect(result).toEqual(link);
  });
});
