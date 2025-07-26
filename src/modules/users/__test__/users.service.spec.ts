import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../../roles/entities/role.entity';
import { RoleEnum } from '../../../modules/roles/role.enum';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockUserRepo = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

const mockRoleRepo = () => ({
  findOne: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let userRepo: jest.Mocked<Repository<User>>;
  let roleRepo: jest.Mocked<Repository<Role>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useFactory: mockUserRepo },
        { provide: getRepositoryToken(Role), useFactory: mockRoleRepo },
      ],
    }).compile();

    service = module.get(UsersService);
    userRepo = module.get(getRepositoryToken(User));
    roleRepo = module.get(getRepositoryToken(Role));
  });

  const mockRole: Role = {
    id: 'r1',
    name: RoleEnum.ADMIN, 
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    users: [],
  };

  const mockUser = (overrides: Partial<User> = {}): User => ({
    id: '1',
    email: 'a@test.com',
    fullName: 'A',
    password: 'pass',
    role: mockRole,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  });

  it('should create a user with role', async () => {
    const dto = {
      email: 'a@test.com',
      fullName: 'A',
      password: 'pass',
      roleId: 'r1',
    };

    const createdUser = mockUser();

    roleRepo.findOne.mockResolvedValue(mockRole);
    userRepo.create.mockReturnValue(createdUser);
    userRepo.save.mockResolvedValue(createdUser);

    const result = await service.create(dto as any);
    expect(result).toEqual(createdUser);
  });

  it('should return all users', async () => {
    const users = [mockUser()];
    userRepo.find.mockResolvedValue(users);

    const result = await service.findAll();
    expect(result).toEqual(users);
  });

  it('should find one user by id', async () => {
    const user = mockUser();
    userRepo.findOne.mockResolvedValue(user);

    const result = await service.findOne('1');
    expect(result).toEqual(user);
  });

  it('should throw NotFoundException if user not found', async () => {
    userRepo.findOne.mockResolvedValue(null);
    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('should update a user', async () => {
    const existingUser = mockUser();
    const dto = { fullName: 'B', roleId: 'r1' };
    const updatedUser = { ...existingUser, fullName: dto.fullName };

    userRepo.findOne.mockResolvedValue(existingUser);
    roleRepo.findOne.mockResolvedValue(mockRole);
    userRepo.save.mockResolvedValue(updatedUser);

    const result = await service.update('1', dto as any);
    expect(result).toEqual(updatedUser);
  });

  it('should delete a user', async () => {
    userRepo.delete.mockResolvedValue({ affected: 1 } as any);
    await expect(service.remove('1')).resolves.toBeUndefined();
    expect(userRepo.delete).toHaveBeenCalledWith('1');
  });

  it('should find user by email without password', async () => {
    const user = mockUser();
    userRepo.findOne.mockResolvedValue(user);

    const result = await service.findByEmail('a@test.com');
    expect(result).toEqual(user);
  });

  it('should find user by email with password', async () => {
    const user = mockUser({ password: 'hashed' });
    userRepo.findOne.mockResolvedValue(user);

    const result = await service.findByEmail('a@test.com', { includePassword: true });
    expect(result).toEqual(user);
  });
});
