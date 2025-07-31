import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateServicesTable1730000000003 implements MigrationInterface {
  name = 'CreateServicesTable1730000000003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "services" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" VARCHAR NOT NULL,
        "description" TEXT,
        "base_price" DECIMAL(10,2) NOT NULL,
        "is_active" BOOLEAN DEFAULT true,
        "unit" VARCHAR NOT NULL,
        "created_at" TIMESTAMP DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "services"`);
  }
}

