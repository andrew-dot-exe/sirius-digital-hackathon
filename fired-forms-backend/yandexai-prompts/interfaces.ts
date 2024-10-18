// interfaces.ts

export interface Message {
    text: string;
    role: 'system' | 'user';
}

export interface CompletionOptions {
    temperature: number;
    maxTokens: number;
}

export interface RequestPayload {
    messages: Message[];
    completionOptions: CompletionOptions;
    modelUri: string;
}

export interface IamToken {
    iamToken: string;
    lifetime: number; // int, in hours
    time: Date;
}

// Интерфейс для сообщения ассистента
export interface AssistantMessage {
    role: string;
    text: string;
}

// Интерфейс для альтернативы
export interface Alternative {
    message: AssistantMessage;
    status: string;
}

// Интерфейс для информации об использовании токенов
export interface Usage {
    inputTextTokens: string;
    completionTokens: string;
    totalTokens: string;
}

// Интерфейс для результата
export interface Result {
    alternatives: Alternative[];
    usage: Usage;
    modelVersion: string;
}

// Интерфейс для ответа
export interface ResponseData {
    result: Result;
}