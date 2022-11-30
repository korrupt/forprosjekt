import { MigrationInterface, QueryRunner } from 'typeorm';

export class batteryInitial1669816880346 implements MigrationInterface {
  name = 'batteryInitial1669816880346';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "battery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "longitude" character varying NOT NULL, "latitude" character varying NOT NULL, CONSTRAINT "PK_48100ff77c357004dfd6a51efdf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`CREATE TYPE "public"."BatteryManagerType" AS ENUM('ADMIN', 'VIEWER')`);
    await queryRunner.query(
      `CREATE TABLE "user_battery" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "batteryId" uuid NOT NULL, "userId" uuid NOT NULL, "type" "public"."BatteryManagerType" NOT NULL, CONSTRAINT "PK_6b30e135669f9cc04c1c4782b56" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_battery" ADD CONSTRAINT "FK_6f3955990b0cdddd73ca6f5539d" FOREIGN KEY ("batteryId") REFERENCES "battery"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_battery" ADD CONSTRAINT "FK_ee12a3f02aff0c1cba3c195a23b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_battery" DROP CONSTRAINT "FK_ee12a3f02aff0c1cba3c195a23b"`);
    await queryRunner.query(`ALTER TABLE "user_battery" DROP CONSTRAINT "FK_6f3955990b0cdddd73ca6f5539d"`);
    await queryRunner.query(`DROP TABLE "user_battery"`);
    await queryRunner.query(`DROP TYPE "public"."BatteryManagerType"`);
    await queryRunner.query(`DROP TABLE "battery"`);
  }
}
