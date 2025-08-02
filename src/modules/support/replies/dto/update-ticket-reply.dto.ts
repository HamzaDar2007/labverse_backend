import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketReplyDto } from './create-ticket-reply.dto';

export class UpdateTicketReplyDto extends PartialType(CreateTicketReplyDto) {}
