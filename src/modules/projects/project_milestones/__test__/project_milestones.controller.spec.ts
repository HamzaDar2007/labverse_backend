import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMilestonesController } from '../project_milestones.controller';
import { ProjectMilestonesService } from '../project_milestones.service';
import { CreateProjectMilestoneDto } from '../dto/create-project-milestone.dto';
import { UpdateProjectMilestoneDto } from '../dto/update-project-milestone.dto';

describe('ProjectMilestonesController', () => {
  let controller: ProjectMilestonesController;
  let service: ProjectMilestonesService;

  const mockMilestone = {
    id: 'uuid-1',
    title: 'Phase 1',
    description: 'Kickoff milestone',
    project_id: 'proj-1',
    due_date: new Date(),
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockMilestone),
    findAll: jest.fn().mockResolvedValue([mockMilestone]),
    findOne: jest.fn().mockResolvedValue(mockMilestone),
    update: jest.fn().mockResolvedValue({ affected: 1 }),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectMilestonesController],
      providers: [
        {
          provide: ProjectMilestonesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProjectMilestonesController>(ProjectMilestonesController);
    service = module.get<ProjectMilestonesService>(ProjectMilestonesService);
  });

  it('should create a milestone', async () => {
    const dto: CreateProjectMilestoneDto = {
      title: 'Phase 1',
      description: 'Kickoff milestone',
      project_id: 'proj-1',
      due_date: new Date(),
    };
    const result = await controller.create(dto);
    expect(result).toEqual(mockMilestone);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should get all milestones', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockMilestone]);
  });

  it('should get one milestone by ID', async () => {
    const result = await controller.findOne('uuid-1');
    expect(result).toEqual(mockMilestone);
    expect(service.findOne).toHaveBeenCalledWith('uuid-1');
  });

  it('should update a milestone', async () => {
    const dto: UpdateProjectMilestoneDto = { title: 'Updated Title' };
    const result = await controller.update('uuid-1', dto);
    expect(result).toEqual({ affected: 1 });
    expect(service.update).toHaveBeenCalledWith('uuid-1', dto);
  });

  it('should delete a milestone', async () => {
    const result = await controller.remove('uuid-1');
    expect(result).toEqual({ affected: 1 });
    expect(service.remove).toHaveBeenCalledWith('uuid-1');
  });
});
