import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMilestonesService } from '../project_milestones.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectMilestone } from '../entities/project-milestone.entity';
import { Repository } from 'typeorm';
import { CreateProjectMilestoneDto } from '../dto/create-project-milestone.dto';
import { UpdateProjectMilestoneDto } from '../dto/update-project-milestone.dto';

describe('ProjectMilestonesService', () => {
  let service: ProjectMilestonesService;
  let repo: Repository<ProjectMilestone>;

  const mockMilestone = {
    id: 'm1',
    title: 'Design Phase',
    description: 'Initial designs',
    due_date: new Date('2025-08-01'),
    project: { id: 'p1' },
  };

  const mockRepo = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue(mockMilestone),
    find: jest.fn().mockResolvedValue([mockMilestone]),
    findOne: jest.fn().mockResolvedValue(mockMilestone),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectMilestonesService,
        {
          provide: getRepositoryToken(ProjectMilestone),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ProjectMilestonesService>(ProjectMilestonesService);
    repo = module.get(getRepositoryToken(ProjectMilestone));
  });

  it('should create milestone', async () => {
    const dto: CreateProjectMilestoneDto = {
      title: 'Design Phase',
      description: 'Initial designs',
      due_date: new Date('2025-08-01'),
      project_id: 'p1',
    };
    const result = await service.create(dto);
    expect(repo.create).toHaveBeenCalled();
    expect(repo.save).toHaveBeenCalled();
    expect(result).toEqual(mockMilestone);
  });

  it('should return all milestones', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockMilestone]);
    expect(repo.find).toHaveBeenCalledWith({ relations: ['project'] });
  });

  it('should return a milestone by id', async () => {
    const result = await service.findOne('m1');
    expect(result).toEqual(mockMilestone);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 'm1' }, relations: ['project'] });
  });

  it('should update milestone', async () => {
    const dto: UpdateProjectMilestoneDto = { title: 'Updated Phase' };
    const result = await service.update('m1', dto);
    expect(repo.update).toHaveBeenCalledWith('m1', dto);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 'm1' }, relations: ['project'] });
    expect(result).toEqual(mockMilestone);
  });

  it('should delete milestone', async () => {
    const result = await service.remove('m1');
    expect(result).toEqual({ affected: 1 });
    expect(repo.delete).toHaveBeenCalledWith('m1');
  });
});
