import { Test, TestingModule } from '@nestjs/testing';
import { ProjectUpdatesController } from '../project_updates.controller';
import { ProjectUpdatesService } from '../project_updates.service';
import { NotFoundException } from '@nestjs/common';

describe('ProjectUpdatesController', () => {
  let controller: ProjectUpdatesController;
  let service: ProjectUpdatesService;

  const mockUpdate = {
    id: 'u1',
    title: 'Initial Progress',
    description: 'Kickoff complete',
    update_date: new Date(),
    milestone: { id: 'm1' },
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockUpdate),
    findAll: jest.fn().mockResolvedValue([mockUpdate]),
    findOne: jest.fn().mockResolvedValue(mockUpdate),
    update: jest.fn().mockResolvedValue(mockUpdate),
    remove: jest.fn().mockResolvedValue({ message: 'Deleted successfully' }),
    findByProject: jest.fn().mockResolvedValue([mockUpdate]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectUpdatesController],
      providers: [
        { provide: ProjectUpdatesService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<ProjectUpdatesController>(ProjectUpdatesController);
    service = module.get<ProjectUpdatesService>(ProjectUpdatesService);
  });

  it('should create an update', async () => {
    const dto = { title: 'Progress', description: 'Done', milestone_id: 'm1' };
    const result = await controller.create(dto as any);
    expect(result).toEqual(mockUpdate);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should get all updates', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockUpdate]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should get one update', async () => {
    const result = await controller.findOne('u1');
    expect(result).toEqual(mockUpdate);
    expect(service.findOne).toHaveBeenCalledWith('u1');
  });

  it('should update an update', async () => {
    const dto = { title: 'Updated' };
    const result = await controller.update('u1', dto as any);
    expect(result).toEqual(mockUpdate);
    expect(service.update).toHaveBeenCalledWith('u1', dto);
  });

  it('should delete an update', async () => {
    const result = await controller.remove('u1');
    expect(result).toEqual({ message: 'Deleted successfully' });
    expect(service.remove).toHaveBeenCalledWith('u1');
  });

  it('should get updates by project ID', async () => {
    const result = await controller.findByProject('p1');
    expect(result).toEqual([mockUpdate]);
    expect(service.findByProject).toHaveBeenCalledWith('p1');
  });

  it('should throw NotFound if update not found', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);
    await expect(controller.findOne('invalid')).rejects.toThrow(NotFoundException);
  });
});
