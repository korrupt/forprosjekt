import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1669472507688 implements MigrationInterface {
    name = 'initial1669472507688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_auth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "salt" character varying NOT NULL, "hash" character varying NOT NULL, "email" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "UQ_USER_AUTH_EMAIL" UNIQUE ("email"), CONSTRAINT "REL_52403f2133a7b1851d8ab4dc9d" UNIQUE ("userId"), CONSTRAINT "PK_56d00ec31dc3eed1c3f6bff4f58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_auth" ADD CONSTRAINT "FK_52403f2133a7b1851d8ab4dc9db" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_auth" DROP CONSTRAINT "FK_52403f2133a7b1851d8ab4dc9db"`);
        await queryRunner.query(`DROP TABLE "user_auth"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
