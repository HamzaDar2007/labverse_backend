import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateConversationsTable1730000000006 implements MigrationInterface {
  name = 'CreateConversationsTable1730000000006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "conversations" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "topic" varchar NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "created_byId" uuid NOT NULL,
        CONSTRAINT "PK_conversations_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_conversations_created_by" FOREIGN KEY ("created_byId")
          REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "conversations"`);
  }
}
