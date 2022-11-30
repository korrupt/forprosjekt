import { MigrationInterface, QueryRunner } from 'typeorm';

export class batteryAclRefactor1669823999753 implements MigrationInterface {
  name = 'batteryAclRefactor1669823999753';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "battery" DROP COLUMN "ownerId"`);
    await queryRunner.query(`ALTER TABLE "user_battery" DROP COLUMN "ownerId"`);
    await queryRunner.query(`ALTER TABLE "user_battery" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "user_battery" DROP COLUMN "updatedAt"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_battery" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "user_battery" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "user_battery" ADD "ownerId" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "battery" ADD "ownerId" character varying NOT NULL`);
  }
}
