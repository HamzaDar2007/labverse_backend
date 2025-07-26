import { ProjectMemberService } from '../project_member.service';
import { AssignMemberDto } from '../dto/assign-member.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProjectMemberService', () => {
  let service: ProjectMemberService;

  beforeEach(() => {
    service = new ProjectMemberService();
  });

  it('should assign a new member', async () => {
    const dto: AssignMemberDto = {
      projectId: 'project-123',
      employeeId: 'emp-456',
      roleOnProject: 'Developer',
    };

    const result = await service.assignMember(dto);

    expect(result).toMatchObject({
      projectId: dto.projectId,
      employeeId: dto.employeeId,
      roleOnProject: dto.roleOnProject,
    });
    expect(result).toHaveProperty('id');
  });

  it('should return all assigned members', async () => {
    const member = await service.assignMember({
      projectId: 'p1',
      employeeId: 'e1',
      roleOnProject: 'Tester',
    });

    const result = await service.findAll();
    expect(result).toContainEqual(member);
  });

  it('should return a specific member by ID', async () => {
    const member = await service.assignMember({
      projectId: 'p2',
      employeeId: 'e2',
      roleOnProject: 'Manager',
    });

    const found = await service.findOne(member.id);
    expect(found).toEqual(member);
  });

  it('should throw NotFoundException if member not found', async () => {
    await expect(service.findOne('invalid-id')).rejects.toThrow(NotFoundException);
  });

  it('should update a member', async () => {
    const member = await service.assignMember({
      projectId: 'p3',
      employeeId: 'e3',
      roleOnProject: 'Analyst',
    });

    const updated = await service.update(member.id, { roleOnProject: 'Architect' });
    expect(updated.roleOnProject).toBe('Architect');
  });

  it('should remove a member', async () => {
    const member = await service.assignMember({
      projectId: 'p4',
      employeeId: 'e4',
      roleOnProject: 'QA',
    });

    const result = await service.remove(member.id);
    expect(result).toEqual({
      deleted: true,
      member,
    });
  });

  it('should throw NotFoundException on update if not found', async () => {
    await expect(service.update('bad-id', { roleOnProject: 'Lead' })).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException on delete if not found', async () => {
    await expect(service.remove('bad-id')).rejects.toThrow(NotFoundException);
  });
});
