// logic.ts

import axios from 'axios';
import { config } from 'dotenv';
config(); // load all secrets from .env file

import { RequestPayload, ResponseData, IamToken } from './interfaces';
import { getValidToken } from './entities';
import { Logger } from '@nestjs/common';

const logger = new Logger('ExecuteRequest'); // Создаем логгер с именем 'ExecuteRequest'
const YANDEX_ENDPOINT = "https://llm.api.cloud.yandex.net/foundationModels/v1/completion";

export const executeRequest = async (rule: string, prompt: string) => {
    const payload: RequestPayload = {
        messages: [
            {
                text: rule,
                role: "system"
            },
            {
                text: prompt,
                role: "user"
            }
        ],
        completionOptions: {
            temperature: 0.1,
            maxTokens: 500
        },
        modelUri: "gpt://b1g4ccae56kv1olpsekl/yandexgpt-lite"
    };

    try {
        logger.log('Preparing to send request to Yandex endpoint'); // Логируем начало выполнения

        // Получаем действительный токен
        const oauthToken = "y0_AgAAAAAWd8uEAATuwQAAAAEVDQoOAABqyUhsNtFEVJyCkgzPqRim7i6ZaA";
        let token: IamToken | null = null;
        token = await getValidToken(oauthToken, token);

        if (!token) {
            logger.error('Failed to get a valid IAM token'); // Логируем ошибку, если токен не получен
            throw new Error('Failed to get a valid IAM token');
        }

        logger.log('Successfully obtained IAM token. Sending request...'); // Логируем успех получения токена

        const response = await axios.post(YANDEX_ENDPOINT, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.iamToken}`,
                'x-folder-id': 'b1g4ccae56kv1olpsekl'
            }
        });

        // Обработка ответа
        const responseData: ResponseData = response.data;
        logger.log('Response received from Yandex API'); // Логируем получение ответа

        if (responseData.result.alternatives && responseData.result.alternatives.length > 0) {
            const alternative = responseData.result.alternatives[0];
            if (alternative.status === "ALTERNATIVE_STATUS_FINAL") {
                logger.log('Returning final alternative response'); // Логируем, что возвращается финальный ответ
                return alternative.message.text;
            } else {
                logger.warn('Received alternative response that is not final'); // Логируем предупреждение
                return null;
            }
        } else {
            logger.warn('No alternatives found in response'); // Логируем предупреждение, если альтернатив нет
            return null;
        }

    } catch (error) {
        logger.error('Error during request execution:', error); // Логируем ошибку
        return null;
    }
};

// Тест для executeRequest
export const test_executeRequest = async () => {
    const rule = 'You are a helpful assistant.';
    const prompt = 'What is the capital of France?';

    try {
        await executeRequest(rule, prompt);
        console.log('Test executeRequest: Passed');
    } catch (error) {
        console.error('Test executeRequest: Failed');
        console.error('Error:', error);
    }
};
