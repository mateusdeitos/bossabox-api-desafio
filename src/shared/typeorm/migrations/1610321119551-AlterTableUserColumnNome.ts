import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTableUserColumnNome1610321119551
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'nome',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'name',
      new TableColumn({
        name: 'nome',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
