import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from '../roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository, DeleteResult } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RoleEnum } from '../role.enum'; // ✅ Ensure this is correctly imported

const mockRepo = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

describe('RolesService', () => {
  let service: RolesService;
  let roleRepo: jest.Mocked<Repository<Role>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        { provide: getRepositoryToken(Role), useFactory: mockRepo },
      ],
    }).compile();

    service = module.get(RolesService);
    roleRepo = module.get(getRepositoryToken(Role));
  });

  it('should create a role', async () => {
    const dto = { name: RoleEnum.ADMIN, description: 'Admin role' };
    const savedRole = { id: '1', ...dto };

    roleRepo.create.mockReturnValue(dto as any);
    roleRepo.save.mockResolvedValue(savedRole as Role);

    const result = await service.create(dto);
    expect(result).toEqual(savedRole);
  });

  it('should return all roles', async () => {
    const roles = [{ id: '1', name: RoleEnum.ADMIN, description: 'Admin role' }];
    roleRepo.find.mockResolvedValue(roles as Role[]);

    const result = await service.findAll();
    expect(result).toEqual(roles);
  });

  it('should find one role by id', async () => {
    const role = { id: '1', name: RoleEnum.ADMIN, description: 'Admin role' };
    roleRepo.findOne.mockResolvedValue(role as Role);

    const result = await service.findOne('1');
    expect(result).toEqual(role);
  });

  it('should throw NotFoundException if role not found', async () => {
    roleRepo.findOne.mockResolvedValue(null);
    await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
  });

  it('should update a role', async () => {
    const existing = { id: '1', name: RoleEnum.ADMIN, description: 'Old desc' };
    const updateDto = { description: 'Updated desc' };
    const updated = { ...existing, ...updateDto };

    roleRepo.findOne.mockResolvedValue(existing as Role);
    roleRepo.save.mockResolvedValue(updated as Role);

    const result = await service.update('1', updateDto);
    expect(result).toEqual(updated);
  });

  it('should delete a role', async () => {
    roleRepo.delete.mockResolvedValue({ affected: 1, raw: {} } as DeleteResult); // ✅ Fixed
    await expect(service.remove('1')).resolves.toBeUndefined();
    expect(roleRepo.delete).toHaveBeenCalledWith('1');
  });
});
