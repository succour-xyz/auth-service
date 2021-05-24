/*
 * Copyright (c) 2021.  Piyush Mehta for Succour.xyz
 */

import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from "typeorm";

/**
 * Users Migration
 */
export class Users1610105419073 implements MigrationInterface {
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
            length: "25",
            name: "username",
            type: "varchar",
          },
          {
            length: "60",
            name: "passwordHash",
            type: "char",
          },
          {
            default: "now()",
            name: "createdAt",
            type: "timestamp",
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
        name: "users",
      })
    );

    await queryRunner.createIndex(
      "users",
      new TableIndex({
        columnNames: ["username"],
        isUnique: true,
        name: "unique_username",
      })
    );
    await queryRunner.createIndex(
      "users",
      new TableIndex({
        columnNames: ["email"],
        isUnique: true,
        name: "unique_email",
      })
    );
    await queryRunner.createIndex(
      "users",
      new TableIndex({
        columnNames: ["phoneNumber"],
        isUnique: true,
        name: "unique_phoneNumber",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
