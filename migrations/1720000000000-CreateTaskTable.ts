import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTasksTable1720000000000 implements MigrationInterface {
  name = 'CreateTasksTable1720000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'tasks',
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
        { name: 'title', type: 'varchar' },
        { name: 'description', type: 'text', isNullable: true },
        { name: 'status', type: 'varchar', default: `'pending'` },
        { name: 'priority', type: 'varchar', default: `'normal'` },
        { name: 'assigned_to_id', type: 'uuid', isNullable: true },
        { name: 'project_id', type: 'uuid', isNullable: true },
        { name: 'milestone_id', type: 'uuid', isNullable: true },
        { name: 'created_at', type: 'timestamp', default: 'now()' },
        { name: 'updated_at', type: 'timestamp', default: 'now()' },
      ],
    }));

    await queryRunner.createForeignKeys('tasks', [
      new TableForeignKey({
        columnNames: ['assigned_to_id'],
        referencedTableName: 'employee_profiles', // ✅ fixed here
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
      new TableForeignKey({
        columnNames: ['project_id'],
        referencedTableName: 'projects',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['milestone_id'],
        referencedTableName: 'project_milestones',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks');
  }
}
