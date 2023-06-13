import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Products1686683544123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Product",
        columns: [
          {
            name: "product_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "productName",
            type: "varchar",
          },
          {
            name: "category",
            type: "varchar",
          },
          {
            name: "price",
            type: "numeric",
          },
          {
            name: "description",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
