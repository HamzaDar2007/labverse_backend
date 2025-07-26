import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMilestonesController } from '../project_milestones.controller';
import { ProjectMilestonesService } from '../project_milestones.service';
import { CreateProjectMilestoneDto } from '../dto/create-project-milestone.dto';
import { UpdateProjectMilestoneDto } from '../dto/update-project-milestone.dto';

describe('ProjectMilestonesController', () => {
  let controller: ProjectMilestonesController;
  let service: ProjectMilestonesService;

  const mockMilestone = {
    id: 'm1',
    title: 'Design Phase',
    description: 'Initial designs',
    due_date: new Date('2025-08-01'),
    project: { id: 'p1' },
  };

  const mockService = {
    create: jest.fn().mockResolvedValue(mockMilestone),
    findAll: jest.fn().mockResolvedValue([mockMilestone]),
    findOne: jest.fn().mockResolvedValue(mockMilestone),
    update: jest.fn().mockResolvedValue(mockMilestone),
    remove: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectMilestonesController],
      providers: [{ provide: ProjectMilestonesService, useValue: mockService }],
    }).compile();

    controller = module.get<ProjectMilestonesController>(ProjectMilestonesController);
    service = module.get<ProjectMilestonesService>(ProjectMilestonesService);
  });

  it('should create milestone', async () => {
    const dto: CreateProjectMilestoneDto = {
      title: 'Design Phase',
      description: 'Initial designs',
      due_date: new Date('2025-08-01'),
      project_id: 'p1',
    };
    const result = await controller.create(dto);
    expect(result).toEqual(mockMilestone);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should get all milestones', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockMilestone]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should get milestone by id', async () => {
    const result = await controller.findOne('m1');
    expect(result).toEqual(mockMilestone);
    expect(service.findOne).toHaveBeenCalledWith('m1');
  });

  it('should update milestone', async () => {
    const dto: UpdateProjectMilestoneDto = { title: 'Updated Phase' };
    const result = await controller.update('m1', dto);
    expect(result).toEqual(mockMilestone);
    expect(service.update).toHaveBeenCalledWith('m1', dto);
  });

  it('should delete milestone', async () => {
    const result = await controller.remove('m1');
    expect(result).toEqual({ affected: 1 });
    expect(service.remove).toHaveBeenCalledWith('m1');
  });
});
