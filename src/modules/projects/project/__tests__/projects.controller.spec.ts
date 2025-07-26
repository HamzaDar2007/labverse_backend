import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from '../projects.controller';
import { ProjectsService } from '../projects.service';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    assignMember: jest.fn(),
    assignTechnology: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [{ provide: ProjectsService, useValue: mockService }],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should call create project', async () => {
    const dto = { name: 'Test Project' };
    mockService.create.mockResolvedValue(dto);
    expect(await controller.create(dto)).toEqual(dto);
  });

  it('should return all projects', async () => {
    const data = [{ id: '1' }];
    mockService.findAll.mockResolvedValue(data);
    expect(await controller.findAll()).toEqual(data);
  });

  it('should return a single project', async () => {
    const project = { id: '1' };
    mockService.findOne.mockResolvedValue(project);
    expect(await controller.findOne('1')).toEqual(project);
  });

  it('should update a project', async () => {
    const updated = { id: '1', name: 'Updated' };
    mockService.update.mockResolvedValue(updated);
    expect(await controller.update('1', { name: 'Updated' })).toEqual(updated);
  });

  it('should delete a project', async () => {
    mockService.remove.mockResolvedValue(undefined);
    expect(await controller.remove('1')).toBeUndefined();
  });

  it('should assign a member', async () => {
    const dto = { projectId: '1', employeeId: '2', roleOnProject: 'Dev' };
    mockService.assignMember.mockResolvedValue(dto);
    expect(await controller.assignMember(dto)).toEqual(dto);
  });

  it('should assign technology', async () => {
    const result = { id: 'pt1' };
    mockService.assignTechnology.mockResolvedValue(result);
    expect(await controller.assignTechnology('1', '2')).toEqual(result);
  });
});
