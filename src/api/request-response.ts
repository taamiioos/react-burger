import { BASE_URL } from '../api/api-config';

export async function checkResponse(res: Response): Promise<any> {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export async function request(endpoint: string, options?: RequestInit): Promise<any> {
    return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
}
