// entities.ts

import axios from 'axios';
import { IamToken } from './interfaces';

// Function to get a new IAM token
export const getYandexIamToken = async (oauthToken: string): Promise<IamToken | null> => {
    const url = 'https://iam.api.cloud.yandex.net/iam/v1/tokens';
    const data = {
        yandexPassportOauthToken: oauthToken
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const currentTime = new Date();
        const iamToken: IamToken = {
            iamToken: response.data.iamToken,
            lifetime: 1, // Lifetime set to 1 hour
            time: currentTime
        };

        return iamToken;

    } catch (error) {
        console.error('Error fetching IAM Token:', error.response?.data || error.message);
        return null;
    }
};

// Function to check if the token is expired
export const isTokenExpired = (token: IamToken): boolean => {
    const currentTime = new Date();
    const tokenExpiryTime = new Date(token.time);
    tokenExpiryTime.setHours(tokenExpiryTime.getHours() + token.lifetime);

    // Check if current time is past the token's expiry time
    return currentTime > tokenExpiryTime;
};

// Function to get a valid token (new if expired)
export const getValidToken = async (oauthToken: string, currentToken: IamToken | null): Promise<IamToken | null> => {
    if (currentToken && !isTokenExpired(currentToken)) {
        // Token is still valid, return it
        console.log('Token is still valid.');
        return currentToken;
    } else {
        // Token is expired or doesn't exist, fetch a new one
        console.log('Token is expired, fetching a new one...');
        return await getYandexIamToken(oauthToken);
    }
};