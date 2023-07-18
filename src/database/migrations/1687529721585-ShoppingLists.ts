import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ShoppingLists1687529721585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "ShoppingLists",
        columns: [
          {
            name: "list_id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "list_name",
            type: "varchar",
          },
          {
            name: "done",
            type: "boolean",
            default:false
          },
        ],
        foreignKeys: [
          {
            name: "FKUser",
            referencedTableName: "Users",
            referencedColumnNames: ["user_id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("ShoppingLists")
  }
}
