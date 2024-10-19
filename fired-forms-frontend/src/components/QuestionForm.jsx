import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'; // Импортируем js-cookie
import { fetchQuestions } from '../api/questionService'; 
import { submitSurvey } from '../api/surveyService'; // Импортируем функцию submitSurvey
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate для перенаправления
import '../styles/QuestionForm.css'; // Импортируем CSS файл

const QuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({}); // Состояние для хранения ответов
  const [submitting, setSubmitting] = useState(false); // Состояние для отслеживания отправки
  const navigate = useNavigate(); // Получаем функцию навигации

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, []);

  // Обработчик изменения значения ввода
  const handleInputChange = (questionId, value) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: value
    }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (event) => {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    setSubmitting(true); // Устанавливаем статус отправки

    // Формируем массив для отправки
    const surveyQuestions = Object.keys(answers).map(questionId => ({
      questionId: Number(questionId), // Приводим к числу
      answer: answers[questionId]
    }));

    try {
      const result = await submitSurvey(surveyQuestions); // Используем submitSurvey
      console.log('Данные успешно отправлены:', result);
      
      // Очистка токена и выход из аккаунта
      Cookies.remove('authToken'); // Удаляем токен аутентификации
      Cookies.remove('userFIO'); // Удаляем FIO пользователя, если необходимо

      // Перенаправление на главную страницу или страницу входа
      navigate('/'); // Замените '/' на нужный путь, если необходимо
      
      // Очистка формы после успешной отправки (опционально)
      setAnswers({});
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false); // Сбрасываем статус отправки
    }
  };

  if (loading) return <p>Данные загружаются...</p>;
  if (error) return <p>!Произошла ошибка {error}</p>; // Если произошла ошибка

  return (
    <div className="question-form-container">
      <h2 className="form-title">Анкета</h2> {/* Заголовок формы */}
      <form className="question-form" onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id} className="form-group">
            <label htmlFor={`question-${question.id}`}>{question.name}</label>
            <input
              type="text"
              id={`question-${question.id}`}
              name={`question-${question.id}`}
              required
              onChange={(e) => handleInputChange(question.id, e.target.value)} // Вызываем обработчик изменения
              className="form-input"
            />
          </div>
        ))}
        <button type="submit" disabled={submitting}>Отправить</button>
        {submitting && <p className="loading-text">Отправка данных...</p>} {/* Индикатор загрузки */}
      </form>
    </div>
  );
};

export default QuestionForm;
