import { MigrationInterface, QueryRunner } from 'typeorm';

export class aclRefactor1669720121232 implements MigrationInterface {
  name = 'aclRefactor1669720121232';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "ownerId" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`CREATE TYPE "public"."AccessRole" AS ENUM('ADMIN', 'USER', 'ANON')`);
    await queryRunner.query(`ALTER TABLE "user" ADD "roles" "public"."AccessRole" array NOT NULL DEFAULT '{}'`);
    await queryRunner.query(`ALTER TABLE "user_auth" ADD "ownerId" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user_auth" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "user_auth" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_auth" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "user_auth" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "user_auth" DROP COLUMN "ownerId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
    await queryRunner.query(`DROP TYPE "public"."AccessRole"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "ownerId"`);
  }
}
