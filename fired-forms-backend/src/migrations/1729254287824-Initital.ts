import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserAndUserLevelTables1672512345678
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`-- Создание таблицы user_levels
    CREATE TABLE user_levels (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL
    );
    
    -- Создание таблицы users
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        fio VARCHAR NOT NULL,
        login VARCHAR UNIQUE NOT NULL,
        password_hash VARCHAR NOT NULL,
        user_level_id INT,
        FOREIGN KEY (user_level_id) REFERENCES user_levels (id) ON DELETE SET NULL
    );
    
    -- Создание таблицы answer_categories
    CREATE TABLE answer_categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL
    );
    
    -- Создание таблицы questions
    CREATE TABLE questions (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL
    );
    
    -- Создание таблицы surveys
    CREATE TABLE surveys (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        completion_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    );
    
    -- Создание таблицы survey_questions
    CREATE TABLE survey_questions (
        id SERIAL PRIMARY KEY,
        survey_id INT NOT NULL,
        question_id INT NOT NULL,
        answer_category_id INT,
        answer VARCHAR NOT NULL,
        FOREIGN KEY (survey_id) REFERENCES surveys (id),
        FOREIGN KEY (question_id) REFERENCES questions (id),
        FOREIGN KEY (answer_category_id) REFERENCES answer_categories (id) ON DELETE SET NULL
    );
    
    -- Создание таблицы response_categories
    CREATE TABLE response_categories (
        id SERIAL PRIMARY KEY,
        answer_category VARCHAR NOT NULL,
        value VARCHAR NOT NULL
    );
    
    -- Создание таблицы reports
    CREATE TABLE reports (
        id SERIAL PRIMARY KEY,
        date_start DATE NOT NULL,
        date_end DATE NOT NULL,
        name VARCHAR,
        description TEXT
    );
    
    -- Создание таблицы report_recommendations
    CREATE TABLE report_recommendations (
        id SERIAL PRIMARY KEY,
        report_id INT NOT NULL,
        category_id INT NOT NULL,
        question VARCHAR NOT NULL,
        name VARCHAR NOT NULL,
        FOREIGN KEY (report_id) REFERENCES reports (id),
        FOREIGN KEY (category_id) REFERENCES response_categories (id)
    );`)

    await queryRunner.query(`
      INSERT INTO answer_categories (name) VALUES
      ('Недовольство условиями труда'),
      ('Недовольство рабочим составом'),
      ('Семейные обстоятельства'),
      ('Личные проблемы'),
      ('Дисциплинарные проступки работника'),
      ('Да'),
      ('Нет'),
      ('Затрудняюсь ответить'),
      ('Прочее');
    `);

    await queryRunner.query(`
      INSERT INTO "questions" (name) VALUES
      ('Какие причины сформировали ваше решение уйти из компании?'),
      ('Есть ли еще дополнительные причины, которые повлияли на решение уйти из компании?'),
      ('Рассматриваете ли вы возможность остаться в компании или перевестись внутри отрасли?'),
      ('Готовы ли вы рекомендовать компанию как работодателя?'),
      ('Рассматриваете ли вы возможность возвращения в компанию?');
    `);

    await queryRunner.query(`
      INSERT INTO user_levels (name) VALUES
      ('manager'),
      ('hr'),
      ('default')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "report_recommendations" CASCADE;`);
    await queryRunner.query(`DROP TABLE "response_categories" CASCADE;`);
    await queryRunner.query(`DROP TABLE "survey_questions" CASCADE;`);
    await queryRunner.query(`DROP TABLE "surveys" CASCADE;`);
    await queryRunner.query(`DROP TABLE "reports" CASCADE;`);
    await queryRunner.query(`DROP TABLE "questions" CASCADE;`);
    await queryRunner.query(`DROP TABLE "answer_categories" CASCADE;`);
    await queryRunner.query(`DROP TABLE "users" CASCADE;`);
    await queryRunner.query(`DROP TABLE "user_levels" CASCADE;`);
  }
}
