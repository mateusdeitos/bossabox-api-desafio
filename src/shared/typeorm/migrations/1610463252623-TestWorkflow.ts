import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TestWorkflow1610463252623 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'test',
        columns: [
          {
            name: 'test',
            type: 'varchar',
          },
        ],
      }),
    );
    await queryRunner.dropTable('test');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'test',
        columns: [
          {
            name: 'test',
            type: 'varchar',
          },
        ],
      }),
    );
    await queryRunner.dropTable('test');
  }
}
