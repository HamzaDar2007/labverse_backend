import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { RoleEnum } from '../../../modules/roles/role.enum';


describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockService },
      ],
    }).compile();

    controller = module.get(UsersController);
    service = module.get(UsersService);
  });

  it('should create a user', async () => {
    const dto = { email: 'a@test.com', fullName: 'A', password: '123', roleId: 'r1' };
    const created = { id: '1', ...dto };
    mockService.create.mockResolvedValue(created);

    const result = await controller.create(dto as any);
    expect(result).toEqual(created);
  });

  it('should return all users', async () => {
    const users = [{ id: '1', email: 'a@test.com' }];
    mockService.findAll.mockResolvedValue(users);

    const result = await controller.findAll();
    expect(result).toEqual(users);
  });

  it('should return one user', async () => {
    const user = { id: '1', email: 'a@test.com' };
    mockService.findOne.mockResolvedValue(user);

    const result = await controller.findOne('1');
    expect(result).toEqual(user);
  });

  it('should update a user', async () => {
    const dto = { fullName: 'B' };
    const updated = { id: '1', email: 'a@test.com', fullName: 'B' };
    mockService.update.mockResolvedValue(updated);

    const result = await controller.update('1', dto as any);
    expect(result).toEqual(updated);
  });

  it('should delete a user', async () => {
    mockService.remove.mockResolvedValue(undefined);
    await expect(controller.remove('1')).resolves.toBeUndefined();
    expect(mockService.remove).toHaveBeenCalledWith('1');
  });
});
