import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateTagsColumnToolTable1610315558884
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tools',
      new TableColumn({
        name: 'tags',
        type: 'varchar',
        isNullable: true,
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tools', 'tags');
  }
}
