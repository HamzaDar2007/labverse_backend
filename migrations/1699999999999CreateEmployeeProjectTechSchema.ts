import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmployeeProjectTechSchema1699999999999 implements MigrationInterface {
  name = 'CreateEmployeeProjectTechSchema1699999999999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable pgcrypto for UUID
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    // Skills Table
    await queryRunner.query(`
      CREATE TABLE skills (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
      );
    `);

    // EmployeeProfiles Table
    await queryRunner.query(`
      CREATE TABLE employee_profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        position VARCHAR(255),
        bio TEXT,
        user_id UUID,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        CONSTRAINT fk_employee_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      );
    `);

    // EmployeeSkills Join Table
    await queryRunner.query(`
      CREATE TABLE employee_skills (
        employee_id UUID NOT NULL,
        skill_id UUID NOT NULL,
        PRIMARY KEY (employee_id, skill_id),
        CONSTRAINT fk_emp_skill_employee FOREIGN KEY (employee_id) REFERENCES employee_profiles(id) ON DELETE CASCADE,
        CONSTRAINT fk_emp_skill_skill FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
      );
    `);

    // Technologies Table
    await queryRunner.query(`
      CREATE TABLE technologies (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
      );
    `);

    // Projects Table
    await queryRunner.query(`
      CREATE TABLE projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        start_date DATE,
        end_date DATE,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
      );
    `);

    // ProjectMembers Table
    await queryRunner.query(`
      CREATE TABLE project_members (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        project_id UUID NOT NULL,
        employee_id UUID NOT NULL,
        role_on_project VARCHAR(255) NOT NULL,
        CONSTRAINT fk_projmem_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        CONSTRAINT fk_projmem_employee FOREIGN KEY (employee_id) REFERENCES employee_profiles(id) ON DELETE CASCADE
      );
    `);

    // ProjectTechnologies Table
    await queryRunner.query(`
      CREATE TABLE project_technologies (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        project_id UUID NOT NULL,
        technology_id UUID NOT NULL,
        CONSTRAINT fk_projtech_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        CONSTRAINT fk_projtech_tech FOREIGN KEY (technology_id) REFERENCES technologies(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS project_technologies;`);
    await queryRunner.query(`DROP TABLE IF EXISTS project_members;`);
    await queryRunner.query(`DROP TABLE IF EXISTS projects;`);
    await queryRunner.query(`DROP TABLE IF EXISTS technologies;`);
    await queryRunner.query(`DROP TABLE IF EXISTS employee_skills;`);
    await queryRunner.query(`DROP TABLE IF EXISTS employee_profiles;`);
    await queryRunner.query(`DROP TABLE IF EXISTS skills;`);
  }
}
