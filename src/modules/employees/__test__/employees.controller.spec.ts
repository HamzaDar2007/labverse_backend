import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from '../employees.controller';
import { EmployeesService } from '../employees.service';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    assignSkill: jest.fn(),
    findBySkill: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [{ provide: EmployeesService, useValue: mockService }],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should create an employee', async () => {
    const dto = { fullName: 'Ali' };
    mockService.create.mockResolvedValue(dto);
    expect(await controller.create(dto)).toEqual(dto);
  });

  it('should return all employees', async () => {
    const list = [{ id: '1' }];
    mockService.findAll.mockResolvedValue(list);
    expect(await controller.findAll()).toEqual(list);
  });

  it('should return one employee', async () => {
    const emp = { id: '1' };
    mockService.findOne.mockResolvedValue(emp);
    expect(await controller.findOne('1')).toEqual(emp);
  });

  it('should update an employee', async () => {
    const updated = { id: '1', fullName: 'Updated' };
    mockService.update.mockResolvedValue(updated);
    expect(await controller.update('1', { fullName: 'Updated' })).toEqual(updated);
  });

  it('should delete an employee', async () => {
    mockService.remove.mockResolvedValue(undefined);
    expect(await controller.remove('1')).toBeUndefined();
  });

  it('should assign a skill', async () => {
    const result = { id: '1', skills: ['skill1'] };
    mockService.assignSkill.mockResolvedValue(result);
    expect(await controller.assignSkill('1', '2')).toEqual(result);
  });

  it('should find by skill', async () => {
    const list = [{ id: '1', skill: 'Vue' }];
    mockService.findBySkill.mockResolvedValue(list);
    expect(await controller.findBySkill('1')).toEqual(list);
  });
});
