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
   // Создание таблицы AnswerCategory
   await queryRunner.query(`
   CREATE TABLE "answer_categories" (
     "id" SERIAL PRIMARY KEY,
     "name" VARCHAR(255) NOT NULL
   );
 `);

 // Создание таблицы Question
 await queryRunner.query(`
   CREATE TABLE "questions" (
     "id" SERIAL PRIMARY KEY,
     "name" VARCHAR(255) NOT NULL
   );
 `);

 // Создание таблицы Report
 await queryRunner.query(`
   CREATE TABLE "reports" (
     "id" SERIAL PRIMARY KEY,
     "date_start" DATE NOT NULL,
     "date_end" DATE NOT NULL,
     "name" VARCHAR(255),
     "description" TEXT
   );
 `);

 
 // Создание таблицы Survey
 await queryRunner.query(`
   CREATE TABLE "surveys" (
     "id" SERIAL PRIMARY KEY,
     "user_id" INTEGER NOT NULL,
     "completion_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     CONSTRAINT "FK_user_survey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE
   );
 `);

 // Создание таблицы SurveyQuestion
 await queryRunner.query(`
   CREATE TABLE "survey_questions" (
     "id" SERIAL PRIMARY KEY,
     "survey_id" INTEGER NOT NULL,
     "question_id" INTEGER NOT NULL,
     "answer_category_id" INTEGER,
     "answer" VARCHAR(255) NOT NULL,
     CONSTRAINT "FK_survey" FOREIGN KEY ("survey_id") REFERENCES "surveys" ("id") ON DELETE CASCADE,
     CONSTRAINT "FK_question" FOREIGN KEY ("question_id") REFERENCES "questions" ("id") ON DELETE CASCADE,
     CONSTRAINT "FK_answer_category" FOREIGN KEY ("answer_category_id") REFERENCES "answer_categories" ("id") ON DELETE SET NULL
   );
 `);

 // Создание таблицы ResponseCategory
 await queryRunner.query(`
   CREATE TABLE "response_categories" (
     "id" SERIAL PRIMARY KEY,
     "answer_category_id" INTEGER NOT NULL,
     "value" VARCHAR(255) NOT NULL,
     CONSTRAINT "FK_answer_category_response" FOREIGN KEY ("answer_category_id") REFERENCES "answer_categories" ("id") ON DELETE CASCADE
   );
 `);

 // Создание таблицы ReportRecommendation
 await queryRunner.query(`
   CREATE TABLE "report_recommendations" (
     "id" SERIAL PRIMARY KEY,
     "report_id" INTEGER NOT NULL,
     "category_id" INTEGER NOT NULL,
     "name" VARCHAR(255) NOT NULL,
     CONSTRAINT "FK_report" FOREIGN KEY ("report_id") REFERENCES "reports" ("id") ON DELETE CASCADE,
     CONSTRAINT "FK_category" FOREIGN KEY ("category_id") REFERENCES "response_categories" ("id") ON DELETE CASCADE
   );
 `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('user_levels');
    await queryRunner.query(`DROP TABLE "report_recommendations";`);
    await queryRunner.query(`DROP TABLE "response_categories";`);
    await queryRunner.query(`DROP TABLE "survey_questions";`);
    await queryRunner.query(`DROP TABLE "surveys";`);
    await queryRunner.query(`DROP TABLE "reports";`);
    await queryRunner.query(`DROP TABLE "questions";`);
    await queryRunner.query(`DROP TABLE "answer_categories";`);
  }
}
