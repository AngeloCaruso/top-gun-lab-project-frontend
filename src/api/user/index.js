import { env } from '../../config/.env';
import { deleteCookie } from '../../utils/cookies';

export async function login(data) {
    const request = await fetch(`${env.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...data
        })
    });
    return await request.json();
}

export async function register(data) {
    const request = await fetch(`${env.baseUrl}/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...data
        })
    });
    return await request.json();
}

export function logoutUser() {
    deleteCookie('user');
    deleteCookie('jwt');
}