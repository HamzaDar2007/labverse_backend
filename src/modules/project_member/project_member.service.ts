import { Injectable, NotFoundException } from '@nestjs/common';
import { AssignMemberDto } from './dto/assign-member.dto';

@Injectable()
export class ProjectMemberService {
  private members = []; // Replace with real DB logic later

  async assignMember(dto: AssignMemberDto) {
    const newMember = { id: crypto.randomUUID(), ...dto };
    this.members.push(newMember);
    return newMember;
  }

  async findAll() {
    return this.members;
  }

  async findOne(id: string) {
    const member = this.members.find((m) => m.id === id);
    if (!member) throw new NotFoundException('Member not found');
    return member;
  }

  async update(id: string, dto: Partial<AssignMemberDto>) {
    const member = this.members.find((m) => m.id === id);
    if (!member) throw new NotFoundException('Member not found');

    Object.assign(member, dto);
    return member;
  }

  async remove(id: string) {
    const index = this.members.findIndex((m) => m.id === id);
    if (index === -1) throw new NotFoundException('Member not found');
    const removed = this.members.splice(index, 1);
    return { deleted: true, member: removed[0] };
  }
}
