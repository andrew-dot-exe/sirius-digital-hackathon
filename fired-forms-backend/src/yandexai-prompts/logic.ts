// logic.ts

import axios from 'axios';
import { config } from 'dotenv';
config(); // load all secrets from .env file

import { RequestPayload, ResponseData, IamToken } from './interfaces';
import { getValidToken } from './entities';

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
        modelUri: "gpt://b1g8h9pfeavpanhj2pfh/yandexgpt-lite"
    };

    try {
        // Получаем действительный токен
        const oauthToken = "y0_AgAAAAARB5wJAATuwQAAAAEVAXXRAAASJtD77ktARZ5y2yFRcE48cjSxPw";
        let token: IamToken | null = null;
        token = await getValidToken(oauthToken, token);

        if (!token) {
            throw new Error('Failed to get a valid IAM token');
        }



        const response = await axios.post(YANDEX_ENDPOINT, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.iamToken}`,
                'x-folder-id': process.env.YNDX_FOLDER
            }
        });

        // Обработка ответа
        const responseData: ResponseData = response.data;
        console.log('Model Version:', responseData.result.modelVersion);
        console.log('Usage:', responseData.result.usage);

        if (responseData.result.alternatives && responseData.result.alternatives.length > 0) {
            const alternative = responseData.result.alternatives[0];
            if (alternative.status === "ALTERNATIVE_STATUS_FINAL") {
                console.log('Assistant Message:', alternative.message.text);
                return responseData;
            } else {
                return null;
            }
        } else {
            return null;
        }

    } catch (error) {
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