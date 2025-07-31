import { MigrationInterface, QueryRunner } from 'typeorm';

// migration/1700000000001-CreatePlanFeaturesTable.ts
export class CreatePlanFeaturesTable1810000000000 implements MigrationInterface {
  name = 'CreatePlanFeaturesTable1810000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "plan_features" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "name" VARCHAR NOT NULL,
        "description" TEXT,
        "created_at" TIMESTAMP DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "plan_features"`);
  }
}

// migration/1700000000002-CreateDevelopmentPlansTable.ts
export class CreateDevelopmentPlansTable1820000000000 implements MigrationInterface {
  name = 'CreateDevelopmentPlansTable1820000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "development_plans" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "title" VARCHAR NOT NULL,
        "description" TEXT,
        "estimated_duration" VARCHAR,
        "base_price" DECIMAL(10,2) NOT NULL,
        "created_at" TIMESTAMP DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "development_plans"`);
  }
}

// migration/1700000000003-CreateDevelopmentPlanFeatureTable.ts
export class CreateDevelopmentPlanFeatureTable1830000000000 implements MigrationInterface {
  name = 'CreateDevelopmentPlanFeatureTable1830000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "development_plan_features" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "development_plan_id" uuid REFERENCES "development_plans"(id) ON DELETE CASCADE,
        "feature_id" uuid REFERENCES "plan_features"(id) ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "development_plan_features"`);
  }
}

// migration/1700000000004-CreateDevelopmentPlanServiceTable.ts
export class CreateDevelopmentPlanServiceTable1840000000000 implements MigrationInterface {
  name = 'CreateDevelopmentPlanServiceTable1840000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "development_plan_services" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "development_plan_id" uuid REFERENCES "development_plans"(id) ON DELETE CASCADE,
        "service_id" uuid REFERENCES "services"(id) ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "development_plan_services"`);
  }
}

// migration/1700000000005-CreateDevelopmentPlanTechnologyTable.ts
export class CreateDevelopmentPlanTechnologyTable1850000000000 implements MigrationInterface {
  name = 'CreateDevelopmentPlanTechnologyTable1850000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "development_plan_technologies" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "development_plan_id" uuid REFERENCES "development_plans"(id) ON DELETE CASCADE,
        "technology_id" uuid NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "development_plan_technologies"`);
  }
}

// migration/1700000000006-CreateClientPlanQuotationsTable.ts
export class CreateClientPlanQuotationsTable1860000000000 implements MigrationInterface {
  name = 'CreateClientPlanQuotationsTable1860000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "client_plan_quotations" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "client_id" uuid NOT NULL,
        "development_plan_id" uuid REFERENCES "development_plans"(id) ON DELETE CASCADE,
        "quotation_total" DECIMAL(10,2) NOT NULL,
        "custom_note" TEXT,
        "status" VARCHAR DEFAULT 'draft',
        "created_at" TIMESTAMP DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "client_plan_quotations"`);
  }
}

// migration/1700000000007-CreateInvoicesTable.ts
export class CreateInvoicesTable1870000000000 implements MigrationInterface {
  name = 'CreateInvoicesTable1870000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "invoices" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "client_id" uuid NOT NULL,
        "quotation_id" uuid REFERENCES "client_plan_quotations"(id) ON DELETE SET NULL,
        "invoice_number" VARCHAR NOT NULL,
        "issue_date" DATE,
        "due_date" DATE,
        "total_amount" DECIMAL(10,2) NOT NULL,
        "amount_paid" DECIMAL(10,2) DEFAULT 0,
        "status" VARCHAR DEFAULT 'unpaid',
        "created_at" TIMESTAMP DEFAULT now(),
        "updated_at" TIMESTAMP DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "invoices"`);
  }
}
