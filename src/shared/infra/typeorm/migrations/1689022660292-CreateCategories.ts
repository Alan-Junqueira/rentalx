import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategories1689022660292 implements MigrationInterface {
  async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "categories",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  async down(queryRunner: QueryRunner) {
    await queryRunner.dropTable("categories");
  }
}
