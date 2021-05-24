import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class Profile1621847824300 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        columns: [
          {
            isPrimary: true,
            length: "36",
            name: "id",
            type: "char",
          },
          {
            length: "36",
            name: "name",
            type: "varchar",
          },
          {
            length: "15",
            name: "phoneNumber",
            type: "varchar",
          },
          {
            length: "45",
            name: "email",
            type: "varchar",
          },
          {
            length: "15",
            name: "location",
            type: "varchar",
          },
          {
            length: "10",
            name: "gender",
            type: "varchar",
          },
          {
            length: "55",
            name: "photo",
            type: "varchar",
          },
        ],
        name: "profiles",
      })
    );

    await queryRunner.createForeignKey(
      "profiles",
      new TableForeignKey({
        columnNames: ["id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("profiles");
  }
}
