import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMemberController } from '../project_member.controller';
import { ProjectMemberService } from '../project_member.service';
import { AssignMemberDto } from '../dto/assign-member.dto';

describe('ProjectMemberController', () => {
  let controller: ProjectMemberController;
  let service: ProjectMemberService;

  const mockService = {
    assignMember: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectMemberController],
      providers: [{ provide: ProjectMemberService, useValue: mockService }],
    }).compile();

    controller = module.get<ProjectMemberController>(ProjectMemberController);
    service = module.get<ProjectMemberService>(ProjectMemberService);
  });

  it('should assign a member', async () => {
    const dto: AssignMemberDto = {
      projectId: 'p1',
      employeeId: 'e1',
      roleOnProject: 'Dev',
    };

    mockService.assignMember.mockResolvedValue({ id: 'm1', ...dto });

    const result = await controller.assign(dto);
    expect(result).toEqual({ id: 'm1', ...dto });
  });

  it('should get all members', async () => {
    mockService.findAll.mockResolvedValue([{ id: 'm1' }]);
    expect(await controller.findAll()).toEqual([{ id: 'm1' }]);
  });

  it('should get one member', async () => {
    mockService.findOne.mockResolvedValue({ id: 'm2' });
    expect(await controller.findOne('m2')).toEqual({ id: 'm2' });
  });

  it('should update a member', async () => {
    const dto = { roleOnProject: 'Lead' };
    mockService.update.mockResolvedValue({ id: 'm3', ...dto });

    const result = await controller.update('m3', dto);
    expect(result).toEqual({ id: 'm3', ...dto });
  });

  it('should remove a member', async () => {
    mockService.remove.mockResolvedValue({ deleted: true });

    const result = await controller.remove('m4');
    expect(result).toEqual({ deleted: true });
  });
});
