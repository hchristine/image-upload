import { MigrationInterface, QueryRunner } from "typeorm";

export class Project1716209966209 implements MigrationInterface {
    name = 'Project1716209966209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying NOT NULL, "qr_url" character varying, "user_id" uuid NOT NULL, "images" character varying array NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "projects" ADD CONSTRAINT "FK_bd55b203eb9f92b0c8390380010" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_bd55b203eb9f92b0c8390380010"`);
        await queryRunner.query(`DROP TABLE "projects"`);
    }

}
