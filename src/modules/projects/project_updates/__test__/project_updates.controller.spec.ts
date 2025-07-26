import { Test, TestingModule } from '@nestjs/testing';
import { ProjectUpdatesController } from '../project_updates.controller';
import { ProjectUpdatesService } from '../project_updates.service';
import { CreateProjectUpdateDto } from '../dto/create-project-update.dto';
import { UpdateProjectUpdateDto } from '../dto/update-project-update.dto';

describe('ProjectUpdatesController', () => {
  let controller: ProjectUpdatesController;
  let service: ProjectUpdatesService;

  const mockUpdate = {
    id: 'u1',
    title: 'Update 1',
    details: 'Details here',
    update_date: new Date(),
    project: { id: 'p1' },
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockUpdate),
    findAll: jest.fn().mockResolvedValue([mockUpdate]),
    findOne: jest.fn().mockResolvedValue(mockUpdate),
    update: jest.fn().mockResolvedValue(mockUpdate),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
    findByProject: jest.fn().mockResolvedValue([mockUpdate]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectUpdatesController],
      providers: [{ provide: ProjectUpdatesService, useValue: mockService }],
    }).compile();

    controller = module.get<ProjectUpdatesController>(ProjectUpdatesController);
    service = module.get<ProjectUpdatesService>(ProjectUpdatesService);
  });

  it('should create an update', async () => {
    const dto: CreateProjectUpdateDto = {
      title: 'Update 1',
      details: 'Details',
      project_id: 'p1',
    };
    const result = await controller.create(dto);
    expect(result).toEqual(mockUpdate);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all updates', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockUpdate]);
  });

  it('should return update by id', async () => {
    const result = await controller.findOne('u1');
    expect(result).toEqual(mockUpdate);
    expect(service.findOne).toHaveBeenCalledWith('u1');
  });

  it('should update update', async () => {
    const dto: UpdateProjectUpdateDto = { title: 'Changed' };
    const result = await controller.update('u1', dto);
    expect(result).toEqual(mockUpdate);
    expect(service.update).toHaveBeenCalledWith('u1', dto);
  });

  it('should delete update', async () => {
    const result = await controller.remove('u1');
    expect(result).toEqual({ affected: 1 });
    expect(service.remove).toHaveBeenCalledWith('u1');
  });

  it('should return updates by project id', async () => {
    const result = await controller.findByProject('p1');
    expect(result).toEqual([mockUpdate]);
    expect(service.findByProject).toHaveBeenCalledWith('p1');
  });
});
