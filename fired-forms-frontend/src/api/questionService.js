const API_URL = 'http://localhost:3000/questions';

export const fetchQuestions = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Запрос выполнен с ошибкой!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при получении вопросов:', error);
      throw error;
    }
  };