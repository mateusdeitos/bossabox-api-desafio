import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class TestWorkflow21610463899765 implements MigrationInterface {
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
