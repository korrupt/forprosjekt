import { MigrationInterface, QueryRunner } from 'typeorm';

export class batterySnapshotInitial1671276933449 implements MigrationInterface {
  name = 'batterySnapshotInitial1671276933449';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "battery_snapshot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "time" TIMESTAMP NOT NULL DEFAULT now(), "data" jsonb NOT NULL, "batteryId" uuid NOT NULL, CONSTRAINT "PK_b2e161bf019abf3cc7d4095a71d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "battery_snapshot" ADD CONSTRAINT "FK_a1e7954476d443d9d0ada25ffe5" FOREIGN KEY ("batteryId") REFERENCES "battery"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "battery_snapshot" DROP CONSTRAINT "FK_a1e7954476d443d9d0ada25ffe5"`);
    await queryRunner.query(`DROP TABLE "battery_snapshot"`);
  }
}
