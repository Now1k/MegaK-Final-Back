import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersMigration1680714324591 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`Your SQL code to change table features"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`Your SQL code reverting changes in method "up"`);
  }
}
