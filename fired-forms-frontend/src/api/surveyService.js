// api/surveyService.js
import Cookies from 'js-cookie'; // Импортируем библиотеку для работы с куками

const API_URL = 'http://localhost:3000/surveys'; // URL для POST запроса

export const submitSurvey = async (surveyQuestions) => {
  const token = Cookies.get('authToken'); // Получаем токен из куков

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Добавляем токен в заголовок
      },
      body: JSON.stringify({ surveyQuestions }),
    });

    // Проверяем статус ответа
    if (!response.ok) {
      throw new Error('Ошибка при отправке данных!'); // Обновлено: теперь проверка статуса
    }

    const result = await response.json();
    return result; // Возвращаем ответ
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    throw error; // Пробрасываем ошибку
  }
};
