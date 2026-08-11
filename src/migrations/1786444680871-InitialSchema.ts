import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1786444680871 implements MigrationInterface {
  name = 'InitialSchema1786444680871';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "products" (
            "id" SERIAL NOT NULL, 
            "name" character varying(150) NOT NULL, 
            "description" text, 
            "price" numeric(10,2) NOT NULL, 
            "stock" integer NOT NULL DEFAULT '0', 
            "isActive" boolean NOT NULL DEFAULT true, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
            CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
