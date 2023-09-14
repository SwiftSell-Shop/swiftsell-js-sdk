import { ObjectType } from "./types/others";

export class ApiClient {
    private API_BASE_URL: string;
    private SWIFT_SELL_KEY: string;
    private defaultHeaders: ObjectType = {
        'Content-Type': 'application/json',
    };

    constructor(apiKey: string, baseUrl: string) {
        this.SWIFT_SELL_KEY = apiKey;
        this.API_BASE_URL = baseUrl
    }

    GET = async (urlPath: string, headers: ObjectType = {}) => {
        return fetch(`${this.API_BASE_URL}${urlPath}`, {
            headers: {
                ...this.defaultHeaders,
                ...headers,
                'x-swiftsell-key': this.SWIFT_SELL_KEY,
            },
            method: 'GET',
        });
    };

    POST = async (urlPath: string, body: ObjectType, headers: ObjectType = {}) => {
        const requestOptions: ObjectType = {
            headers: {
                ...this.defaultHeaders,
                ...headers,
                'x-swiftsell-key': this.SWIFT_SELL_KEY,
            },
            body: JSON.stringify(body),
            method: 'POST',
        };
        return fetch(`${this.API_BASE_URL}${urlPath}`, requestOptions);
    };

    PUT = async (urlPath: string, body: ObjectType, headers: ObjectType = {}) => {
        const requestOptions: ObjectType = {
            headers: {
                ...this.defaultHeaders,
                ...headers,
                'x-swiftsell-key': this.SWIFT_SELL_KEY,
            },
            body: JSON.stringify(body),
            method: 'PUT',
        };
        return fetch(`${this.API_BASE_URL}${urlPath}`, requestOptions);
    }

}