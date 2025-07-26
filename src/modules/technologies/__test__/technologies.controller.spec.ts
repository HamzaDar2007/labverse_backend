import { Test, TestingModule } from '@nestjs/testing';
import { TechnologiesController } from '../technologies.controller';
import { TechnologiesService } from '../technologies.service';

describe('TechnologiesController', () => {
  let controller: TechnologiesController;
  let service: TechnologiesService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechnologiesController],
      providers: [{ provide: TechnologiesService, useValue: mockService }],
    }).compile();

    controller = module.get<TechnologiesController>(TechnologiesController);
    service = module.get<TechnologiesService>(TechnologiesService);
  });

  it('should create technology', async () => {
    const dto = { name: 'NestJS' };
    mockService.create.mockResolvedValue(dto);
    expect(await controller.create(dto)).toEqual(dto);
  });

  it('should return all technologies', async () => {
    const list = [{ id: '1', name: 'Angular' }];
    mockService.findAll.mockResolvedValue(list);
    expect(await controller.findAll()).toEqual(list);
  });

  it('should return one technology', async () => {
    const tech = { id: '1', name: 'Vue' };
    mockService.findOne.mockResolvedValue(tech);
    expect(await controller.findOne('1')).toEqual(tech);
  });

  it('should update technology', async () => {
    const updated = { id: '1', name: 'Updated' };
    mockService.update.mockResolvedValue(updated);
    expect(await controller.update('1', { name: 'Updated' })).toEqual(updated);
  });

  it('should delete technology', async () => {
    mockService.remove.mockResolvedValue(undefined);
    expect(await controller.remove('1')).toBeUndefined();
  });
});
