import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesService } from '../employees.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmployeeProfile } from '../entities/employee_profile.entity';
import { User } from '../../users/entities/user.entity';
import { Skill } from '../../skills/entities/skill.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockRepo = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  })),
});

describe('EmployeesService', () => {
  let service: EmployeesService;
  let employeeRepo: jest.Mocked<Repository<EmployeeProfile>>;
  let userRepo: jest.Mocked<Repository<User>>;
  let skillRepo: jest.Mocked<Repository<Skill>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        { provide: getRepositoryToken(EmployeeProfile), useFactory: mockRepo },
        { provide: getRepositoryToken(User), useFactory: mockRepo },
        { provide: getRepositoryToken(Skill), useFactory: mockRepo },
      ],
    }).compile();

    service = module.get(EmployeesService);
    employeeRepo = module.get(getRepositoryToken(EmployeeProfile));
    userRepo = module.get(getRepositoryToken(User));
    skillRepo = module.get(getRepositoryToken(Skill));
  });

  it('should create an employee profile', async () => {
    const dto = { fullName: 'Ali', userId: 'u1' };
    const created = { id: '1', ...dto };

    employeeRepo.create.mockReturnValue(created as any);
    userRepo.findOne.mockResolvedValue({ id: 'u1' } as User);
    employeeRepo.save.mockResolvedValue(created as any);

    const result = await service.create(dto);
    expect(result).toEqual(created);
  });

  it('should find all employees', async () => {
    const list = [{ id: '1', fullName: 'Hamza' }];
    employeeRepo.find.mockResolvedValue(list as any);

    expect(await service.findAll()).toEqual(list);
  });

  it('should return a single employee', async () => {
    const emp = { id: '1', fullName: 'Zain' };
    employeeRepo.findOne.mockResolvedValue(emp as any);

    expect(await service.findOne('1')).toEqual(emp);
  });

  it('should throw if employee not found', async () => {
    employeeRepo.findOne.mockResolvedValue(null);
    await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should update an employee profile', async () => {
    const existing = { id: '1', fullName: 'Old' };
    const updated = { id: '1', fullName: 'New' };

    employeeRepo.findOne.mockResolvedValue(existing as any);
    employeeRepo.save.mockResolvedValue(updated as any);

    expect(await service.update('1', { fullName: 'New' })).toEqual(updated);
  });

  it('should delete an employee profile', async () => {
    employeeRepo.delete.mockResolvedValue({ affected: 1 } as any);
    await service.remove('1');
    expect(employeeRepo.delete).toHaveBeenCalledWith('1');
  });

  it('should assign a skill to employee', async () => {
    const emp: EmployeeProfile = {
      id: '1',
      fullName: 'Ali',
      email: 'ali@example.com',
      position: 'Developer',
      bio: 'Bio',
      skills: [],
      user: {} as User,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const skill: Skill = {
      id: 's1',
      name: 'NestJS',
      description: 'Backend framework',
      employees: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    employeeRepo.findOne.mockResolvedValue(emp);
    skillRepo.findOne.mockResolvedValue(skill);
    employeeRepo.save.mockResolvedValue({ ...emp, skills: [skill] });

    const result = await service.assignSkill('1', 's1');
    expect(result.skills).toContain(skill);
  });

  it('should find employees by skill', async () => {
    const queryResult = [{ id: '1', fullName: 'Ali' }];
    const mockQueryBuilder = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(queryResult),
    };

    employeeRepo.createQueryBuilder.mockReturnValue(mockQueryBuilder as any);

    const result = await service.findBySkill('s1');
    expect(result).toEqual(queryResult);
  });
});
