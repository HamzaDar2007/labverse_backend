import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientApprovalsTable1730000000007 implements MigrationInterface {
  name = 'CreateClientApprovalsTable1730000000007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "client_approvals" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "client_id" uuid NOT NULL,
        "request_title" varchar NOT NULL,
        "request_description" text NOT NULL,
        "status" varchar NOT NULL DEFAULT 'pending',
        "client_response" varchar,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_client_approvals_id" PRIMARY KEY ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "client_approvals";
    `);
  }
}
