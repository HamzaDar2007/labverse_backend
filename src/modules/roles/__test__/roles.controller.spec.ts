import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from '../roles.controller';
import { RolesService } from '../roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleEnum } from '../role.enum'; // Make sure this path is correct

describe('RolesController', () => {
  let controller: RolesController;
  let mockService: Partial<RolesService>;

  beforeEach(async () => {
    mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        { provide: RolesService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('should create a role', async () => {
    const dto: CreateRoleDto = {
      name: RoleEnum.ADMIN,
      description: 'Admin role',
    };

    const result = { id: '1', ...dto };

    (mockService.create as jest.Mock).mockResolvedValue(result);
    expect(await controller.create(dto)).toEqual(result);
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should get all roles', async () => {
    const roles = [{ id: '1', name: RoleEnum.ADMIN, description: 'desc' }];
    (mockService.findAll as jest.Mock).mockResolvedValue(roles);
    expect(await controller.findAll()).toEqual(roles);
  });

  it('should get a role by id', async () => {
    const role = { id: '1', name: RoleEnum.ADMIN, description: 'desc' };
    (mockService.findOne as jest.Mock).mockResolvedValue(role);
    expect(await controller.findOne('1')).toEqual(role);
  });

  it('should update a role', async () => {
    const dto: UpdateRoleDto = { description: 'updated desc' };
    const role = { id: '1', name: RoleEnum.ADMIN, description: 'updated desc' };
    (mockService.update as jest.Mock).mockResolvedValue(role);
    expect(await controller.update('1', dto)).toEqual(role);
  });

  it('should remove a role', async () => {
    (mockService.remove as jest.Mock).mockResolvedValue(undefined);
    await expect(controller.remove('1')).resolves.toBeUndefined();
    expect(mockService.remove).toHaveBeenCalledWith('1');
  });
});
