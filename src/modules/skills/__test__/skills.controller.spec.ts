import { Test, TestingModule } from '@nestjs/testing';
import { SkillsController } from '../skills.controller';
import { SkillsService } from '../skills.service';

describe('SkillsController', () => {
  let controller: SkillsController;
  let service: SkillsService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillsController],
      providers: [{ provide: SkillsService, useValue: mockService }],
    }).compile();

    controller = module.get<SkillsController>(SkillsController);
    service = module.get<SkillsService>(SkillsService);
  });

  it('should create a skill', async () => {
    const dto = { name: 'GraphQL' };
    mockService.create.mockResolvedValue(dto);
    expect(await controller.create(dto)).toEqual(dto);
  });

  it('should get all skills', async () => {
    const list = [{ id: '1', name: 'Vue' }];
    mockService.findAll.mockResolvedValue(list);
    expect(await controller.findAll()).toEqual(list);
  });

  it('should get one skill', async () => {
    const skill = { id: '1', name: 'SQL' };
    mockService.findOne.mockResolvedValue(skill);
    expect(await controller.findOne('1')).toEqual(skill);
  });

  it('should update a skill', async () => {
    const updated = { id: '1', name: 'Updated Skill' };
    mockService.update.mockResolvedValue(updated);
    expect(await controller.update('1', { name: 'Updated Skill' })).toEqual(updated);
  });

  it('should remove a skill', async () => {
    mockService.remove.mockResolvedValue(undefined);
    expect(await controller.remove('1')).toBeUndefined();
  });
});
