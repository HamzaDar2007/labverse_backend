import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly repo: Repository<Conversation>,
    @InjectRepository(User)
  private readonly userRepo: Repository<User>, // inject User repository
  ) {}


  async create(dto: CreateConversationDto) {
  const user = await this.userRepo.findOne({ where: { id: dto.created_by } });
  if (!user) throw new NotFoundException('User not found');

  const conversation = this.repo.create({
    ...dto,
    created_by: user,
  });

  return this.repo.save(conversation);
}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const convo = await this.repo.findOne({ where: { id } });
    if (!convo) throw new NotFoundException('Conversation not found');
    return convo;
  }

  async update(id: string, dto: UpdateConversationDto) {
    const convo = await this.findOne(id);
    Object.assign(convo, dto);
    return this.repo.save(convo);
  }

  async remove(id: string) {
    const convo = await this.findOne(id);
    return this.repo.remove(convo);
  }
}