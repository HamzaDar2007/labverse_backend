import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMilestonesService } from '../project_milestones.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectMilestone } from '../entities/project-milestone.entity';
import { Repository } from 'typeorm';

const mockMilestone = {
  id: 'uuid-1',
  title: 'Kickoff',
  description: 'Initial phase',
  project: { id: 'proj-1' },
  due_date: new Date(),
};

describe('ProjectMilestonesService', () => {
  let service: ProjectMilestonesService;
  let repo: Repository<ProjectMilestone>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectMilestonesService,
        {
          provide: getRepositoryToken(ProjectMilestone),
          useValue: {
            save: jest.fn().mockResolvedValue(mockMilestone),
            find: jest.fn().mockResolvedValue([mockMilestone]),
            findOne: jest.fn().mockResolvedValue(mockMilestone),
            update: jest.fn().mockResolvedValue({ affected: 1 }),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<ProjectMilestonesService>(ProjectMilestonesService);
    repo = module.get(getRepositoryToken(ProjectMilestone));
  });

  it('should create a milestone', async () => {
    const result = await service.create(mockMilestone as any);
    expect(result).toEqual(mockMilestone);
    expect(repo.save).toHaveBeenCalledWith(mockMilestone);
  });

  it('should get all milestones', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockMilestone]);
  });

  it('should get a milestone by id', async () => {
    const result = await service.findOne('uuid-1');
    expect(result).toEqual(mockMilestone);
  });

  it('should update a milestone', async () => {
    const result = await service.update('uuid-1', { title: 'Updated' } as any);
    expect(result).toEqual({ affected: 1 });
  });

  it('should delete a milestone', async () => {
    const result = await service.remove('uuid-1');
    expect(result).toEqual({ affected: 1 });
  });
});
