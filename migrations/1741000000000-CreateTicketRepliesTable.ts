// 1740000000000
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTicketRepliesTable1741000000000 implements MigrationInterface {
  name = 'CreateTicketRepliesTable1741000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "ticket_replies" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "message" text NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "ticket_id" uuid,
        "user_id" uuid,
        CONSTRAINT "PK_ticket_replies_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_reply_ticket" FOREIGN KEY ("ticket_id")
          REFERENCES "tickets"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_reply_user" FOREIGN KEY ("user_id")
          REFERENCES "users"("id") ON DELETE SET NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ticket_replies"`);
  }
}
