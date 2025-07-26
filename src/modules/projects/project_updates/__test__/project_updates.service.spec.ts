import { Test, TestingModule } from '@nestjs/testing';
import { ProjectUpdatesService } from '../project_updates.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectUpdate } from '../entities/project-update.entity';
import { Repository } from 'typeorm';

const mockUpdate = {
  id: 'u1',
  title: 'Update 1',
  details: 'Update details',
  update_date: new Date(),
  project: { id: 'p1' },
};

describe('ProjectUpdatesService', () => {
  let service: ProjectUpdatesService;
  let repo: jest.Mocked<Repository<ProjectUpdate>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectUpdatesService,
        {
          provide: getRepositoryToken(ProjectUpdate),
          useValue: {
            create: jest.fn().mockReturnValue(mockUpdate),
            save: jest.fn().mockResolvedValue(mockUpdate),
            find: jest.fn().mockResolvedValue([mockUpdate]),
            findOne: jest.fn().mockResolvedValue(mockUpdate),
            update: jest.fn().mockResolvedValue({ affected: 1 }),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<ProjectUpdatesService>(ProjectUpdatesService);
    repo = module.get(getRepositoryToken(ProjectUpdate));
  });

  it('should create an update', async () => {
    const result = await service.create(mockUpdate as any);
    expect(result).toEqual(mockUpdate);
    expect(repo.save).toHaveBeenCalledWith(mockUpdate);
  });

  it('should find all updates', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockUpdate]);
  });

  it('should find one update', async () => {
    const result = await service.findOne('u1');
    expect(result).toEqual(mockUpdate);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 'u1' }, relations: ['project'] });
  });

  it('should update an update', async () => {
    const result = await service.update('u1', { title: 'Updated' } as any);
    expect(result).toEqual(mockUpdate);
    expect(repo.update).toHaveBeenCalledWith('u1', { title: 'Updated' });
  });

  it('should delete an update', async () => {
    const result = await service.remove('u1');
    expect(result).toEqual({ affected: 1 });
    expect(repo.delete).toHaveBeenCalledWith('u1');
  });

  it('should find updates by projectId', async () => {
    const result = await service.findByProject('p1');
    expect(result).toEqual([mockUpdate]);
    expect(repo.find).toHaveBeenCalledWith({
      where: { project: { id: 'p1' } },
      relations: ['project'],
      order: { update_date: 'DESC' },
    });
  });
});
