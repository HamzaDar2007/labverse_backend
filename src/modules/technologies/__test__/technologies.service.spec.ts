import { Test, TestingModule } from '@nestjs/testing';
import { TechnologiesService } from '../technologies.service';
import { Technology } from '../entities/technology.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockRepo = (): Partial<jest.Mocked<Repository<Technology>>> => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

describe('TechnologiesService', () => {
  let service: TechnologiesService;
  let techRepo: jest.Mocked<Repository<Technology>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechnologiesService,
        { provide: getRepositoryToken(Technology), useFactory: mockRepo },
      ],
    }).compile();

    service = module.get<TechnologiesService>(TechnologiesService);
    techRepo = module.get(getRepositoryToken(Technology));
  });

  it('should create technology', async () => {
    const dto = { name: 'Node.js' };
    const tech = { id: '1', ...dto } as Technology;

    techRepo.create.mockReturnValue(tech);
    techRepo.save.mockResolvedValue(tech);

    expect(await service.create(dto)).toEqual(tech);
  });

  it('should return all technologies', async () => {
    const techs = [{ id: '1', name: 'NestJS' }] as Technology[];
    techRepo.find.mockResolvedValue(techs);

    expect(await service.findAll()).toEqual(techs);
  });

  it('should return a technology by ID', async () => {
    const tech = { id: '1', name: 'React' } as Technology;
    techRepo.findOne.mockResolvedValue(tech);

    expect(await service.findOne('1')).toEqual(tech);
  });

  it('should throw NotFoundException if technology not found', async () => {
    techRepo.findOne.mockResolvedValue(null);
    await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should update a technology', async () => {
    const existing = { id: '1', name: 'Old Name' } as Technology;
    const updated = { id: '1', name: 'New Name' } as Technology;

    techRepo.findOne.mockResolvedValue(existing);
    techRepo.save.mockResolvedValue(updated);

    expect(await service.update('1', { name: 'New Name' })).toEqual(updated);
  });

  it('should delete a technology', async () => {
    techRepo.delete.mockResolvedValue({ affected: 1 } as any);
    await service.remove('1');
    expect(techRepo.delete).toHaveBeenCalledWith('1');
  });
});
