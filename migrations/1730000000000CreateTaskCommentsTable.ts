import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTaskCommentsTable1730000000000 implements MigrationInterface {
  name = 'CreateTaskCommentsTable1730000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'task_comments',
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
        { name: 'task_id', type: 'uuid' },
        { name: 'author_id', type: 'uuid' },
        { name: 'comment', type: 'text' },
        { name: 'created_at', type: 'timestamp', default: 'now()' },
      ],
    }));

    await queryRunner.createForeignKeys('task_comments', [
      new TableForeignKey({
        columnNames: ['task_id'],
        referencedTableName: 'tasks',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['author_id'],
        referencedTableName: 'employee_profiles', // ✅ fixed here
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task_comments');
  }
}
