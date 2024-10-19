import React, { useEffect, useState } from 'react';
import { fetchQuestions } from '../api/questionService'; 

const QuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Данные загружаются...</p>;
  if (error) return <p>!Произошла ошибка {error}</p>; // Если произошла ошибка

  return (
    <form>
      {questions.map((question) => (
        <div key={question.id}>
          <label htmlFor={`question-${question.id}`}>{question.name}</label>
          <input
            type="text"
            id={`question-${question.id}`}
            name={`question-${question.id}`}
            required
          />
        </div>
      ))}
      <button type="submit">Отправить</button>
    </form>
  );
};

export default QuestionForm;