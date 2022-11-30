import { MigrationInterface, QueryRunner } from 'typeorm';

export class batteryLonglatRefactor1669820215435 implements MigrationInterface {
  name = 'batteryLonglatRefactor1669820215435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "battery" ALTER COLUMN "longitude" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "battery" ALTER COLUMN "latitude" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "battery" ALTER COLUMN "latitude" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "battery" ALTER COLUMN "longitude" SET NOT NULL`);
  }
}
