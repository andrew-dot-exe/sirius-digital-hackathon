import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserAndUserLevelTables1672512345678
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE user_levels (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL
      )
    `);

    // Inserting predefined user levels
    await queryRunner.query(`
      INSERT INTO user_levels (name) VALUES
      ('manager'),
      ('hr'),
      ('default')
    `);

    await queryRunner.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        fio VARCHAR NOT NULL,
        login VARCHAR NOT NULL UNIQUE,
        password_hash VARCHAR NOT NULL,
        user_level_id INT,
        FOREIGN KEY (user_level_id) REFERENCES user_levels(id) ON DELETE SET NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('user_levels');
  }
}
