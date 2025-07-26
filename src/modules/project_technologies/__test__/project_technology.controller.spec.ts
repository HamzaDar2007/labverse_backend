import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTechnologyController } from '../project_technology.controller';
import { ProjectTechnologyService } from '../project_technology.service';

describe('ProjectTechnologyController', () => {
  let controller: ProjectTechnologyController;
  let service: ProjectTechnologyService;

  const mockService = {
    assignTechnologyToProject: jest.fn(),
    getAllLinks: jest.fn(),
    getLinkById: jest.fn(),
    updateLink: jest.fn(),
    removeLink: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectTechnologyController],
      providers: [
        { provide: ProjectTechnologyService, useValue: mockService },
      ],
    }).compile();

    controller = module.get(ProjectTechnologyController);
    service = module.get(ProjectTechnologyService);
  });

  it('should assign technology', async () => {
    const dto = { projectId: 'p1', technologyId: 't1' };
    const expected = { id: '1', ...dto };
    mockService.assignTechnologyToProject.mockResolvedValue(expected);
    expect(await controller.assignTechnology(dto)).toEqual(expected);
  });

  it('should get all links', async () => {
    const links = [{ id: '1' }];
    mockService.getAllLinks.mockResolvedValue(links);
    expect(await controller.getAllLinks()).toEqual(links);
  });

  it('should get link by id', async () => {
    const link = { id: '1' };
    mockService.getLinkById.mockResolvedValue(link);
    expect(await controller.getLinkById('1')).toEqual(link);
  });

  it('should update link', async () => {
    const dto = { projectId: 'p2', technologyId: 't2' };
    const updated = { id: '1', ...dto };
    mockService.updateLink.mockResolvedValue(updated);
    expect(await controller.updateLink('1', dto)).toEqual(updated);
  });

  it('should remove link', async () => {
    const removed = { deleted: true };
    mockService.removeLink.mockResolvedValue(removed);
    expect(await controller.removeLink('1')).toEqual(removed);
  });
});
