import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskTable1650956199493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task_entity" ADD COLUMN "status" INTEGER ARRAY DEFAULT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
