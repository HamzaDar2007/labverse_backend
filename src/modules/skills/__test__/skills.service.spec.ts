import { Test, TestingModule } from '@nestjs/testing';
import { SkillsService } from '../skills.service';
import { Skill } from '../entities/skill.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockRepo = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

describe('SkillsService', () => {
  let service: SkillsService;
  let repo: jest.Mocked<Repository<Skill>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillsService,
        {
          provide: getRepositoryToken(Skill),
          useFactory: mockRepo,
        },
      ],
    }).compile();

    service = module.get<SkillsService>(SkillsService);
    repo = module.get(getRepositoryToken(Skill));
  });

  it('should create a skill', async () => {
    const dto = { name: 'TypeScript' };
    const skill: Skill = {
      id: '1',
      name: 'TypeScript',
      description: '',
      employees: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repo.create.mockReturnValue(skill);
    repo.save.mockResolvedValue(skill);

    expect(await service.create(dto)).toEqual(skill);
  });

  it('should return all skills', async () => {
    const skills = [
      { id: '1', name: 'JavaScript', employees: [] },
    ] as Skill[];
    repo.find.mockResolvedValue(skills);

    expect(await service.findAll()).toEqual(skills);
  });

  it('should return one skill', async () => {
    const skill = {
      id: '1',
      name: 'NestJS',
      description: '',
      employees: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    repo.findOne.mockResolvedValue(skill as Skill);
    expect(await service.findOne('1')).toEqual(skill);
  });

  it('should throw if skill not found', async () => {
    repo.findOne.mockResolvedValue(null);
    await expect(service.findOne('123')).rejects.toThrow(NotFoundException);
  });

  it('should update a skill', async () => {
    const skill = {
      id: '1',
      name: 'React',
      description: '',
      employees: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updated = { ...skill, name: 'ReactJS' };

    repo.findOne.mockResolvedValue(skill as Skill);
    repo.save.mockResolvedValue(updated as Skill);

    expect(await service.update('1', { name: 'ReactJS' })).toEqual(updated);
  });

  it('should remove a skill', async () => {
    repo.delete.mockResolvedValue({ affected: 1 } as any);
    await service.remove('1');

    expect(repo.delete).toHaveBeenCalledWith('1');
  });
});
