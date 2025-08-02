// 1740000000000
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTicketsTable1740000000000 implements MigrationInterface {
  name = 'CreateTicketsTable1740000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "ticket_status_enum" AS ENUM ('open', 'in_progress', 'resolved', 'closed');
    `);
    await queryRunner.query(`
      CREATE TYPE "ticket_priority_enum" AS ENUM ('low', 'medium', 'high');
    `);
    await queryRunner.query(`
      CREATE TABLE "tickets" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "subject" VARCHAR NOT NULL,
        "description" TEXT NOT NULL,
        "status" "ticket_status_enum" NOT NULL DEFAULT 'open',
        "priority" "ticket_priority_enum",
        "assigned_to" uuid,
        "submitted_by" uuid NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_tickets_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_ticket_assigned_to" FOREIGN KEY ("assigned_to")
          REFERENCES "employee_profiles"("id") ON DELETE SET NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tickets"`);
    await queryRunner.query(`DROP TYPE "ticket_status_enum"`);
    await queryRunner.query(`DROP TYPE "ticket_priority_enum"`);
  }
}
