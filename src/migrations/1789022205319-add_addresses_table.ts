import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressesTable1789022205319 implements MigrationInterface {
    name = 'AddAddressesTable1789022205319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."addresses_type_enum" AS ENUM('HOME', 'WORK', 'OTHER')`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "addressLine1" character varying(255) NOT NULL, "addressLine2" character varying(255), "city" character varying(255) NOT NULL, "state" character varying(255) NOT NULL, "postalCode" character varying(20) NOT NULL, "country" character varying(255) NOT NULL, "isDefault" boolean NOT NULL DEFAULT false, "type" "public"."addresses_type_enum" NOT NULL DEFAULT 'HOME', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TYPE "public"."addresses_type_enum"`);
    }

}
