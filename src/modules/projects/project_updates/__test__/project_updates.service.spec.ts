import { Test, TestingModule } from '@nestjs/testing';
import { ProjectUpdatesService } from '../project_updates.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectUpdate } from '../entities/project-update.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ProjectUpdatesService', () => {
  let service: ProjectUpdatesService;
  let repo: Repository<ProjectUpdate>;

  const mockUpdate = {
    id: 'u1',
    title: 'Initial Progress',
    description: 'Kickoff complete',
    update_date: new Date(),
    milestone: { id: 'm1' },
  };

  const mockRepo = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue(mockUpdate),
    find: jest.fn().mockResolvedValue([mockUpdate]),
    findOne: jest.fn().mockResolvedValue(mockUpdate),
    preload: jest.fn().mockResolvedValue(mockUpdate),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([mockUpdate]),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectUpdatesService,
        {
          provide: getRepositoryToken(ProjectUpdate),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ProjectUpdatesService>(ProjectUpdatesService);
    repo = module.get(getRepositoryToken(ProjectUpdate));
  });

  it('should create an update', async () => {
    const dto = { title: 'Initial Progress', description: 'Kickoff complete', milestone_id: 'm1' };
    const result = await service.create(dto as any);
    expect(repo.create).toHaveBeenCalled();
    expect(repo.save).toHaveBeenCalled();
    expect(result).toEqual(mockUpdate);
  });

  it('should return all updates', async () => {
    const result = await service.findAll();
    expect(repo.find).toHaveBeenCalledWith({ relations: ['milestone'] });
    expect(result).toEqual([mockUpdate]);
  });

  it('should return one update by id', async () => {
    const result = await service.findOne('u1');
    expect(result).toEqual(mockUpdate);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 'u1' }, relations: ['milestone'] });
  });

  it('should update an update', async () => {
    const dto = { title: 'Updated Title' };
    const result = await service.update('u1', dto as any);
    expect(repo.preload).toHaveBeenCalled();
    expect(repo.save).toHaveBeenCalledWith(mockUpdate);
    expect(result).toEqual(mockUpdate);
  });

  it('should delete an update', async () => {
    const result = await service.remove('u1');
    expect(repo.delete).toHaveBeenCalledWith('u1');
    expect(result).toEqual({ message: 'Deleted successfully' });
  });

  it('should return updates by project ID', async () => {
    const result = await service.findByProject('p1');
    expect(result).toEqual([mockUpdate]);
  });
});
