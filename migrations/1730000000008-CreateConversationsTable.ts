import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateConversationParticipantsTable1730000000008 implements MigrationInterface {
  name = 'CreateConversationParticipantsTable1730000000008';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "conversation_participants" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "role" VARCHAR NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "conversation_id" uuid,
        "user_id" uuid,
        CONSTRAINT "PK_conversation_participants_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_conversation_user" UNIQUE ("conversation_id", "user_id"),
        CONSTRAINT "FK_participant_conversation" FOREIGN KEY ("conversation_id")
          REFERENCES "conversations"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_participant_user" FOREIGN KEY ("user_id")
          REFERENCES "users"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "conversation_participants"`);
  }
}
