import { MigrationInterface, QueryRunner } from 'typeorm';
export class CreatePaymentsTable1730000000005 implements MigrationInterface {
  name = 'CreatePaymentsTable1730000000005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "payments" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "invoice_id" uuid REFERENCES "invoices"(id) ON DELETE CASCADE,
        "amount_paid" DECIMAL(10,2) NOT NULL,
        "payment_method" VARCHAR NOT NULL,
        "payment_reference" VARCHAR,
        "payment_date" TIMESTAMP,
        "note" TEXT,
        "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "payments"`);
  }
}
