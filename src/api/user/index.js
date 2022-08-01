import { env } from '../../config/.env';

export async function login(data) {
    const request = await fetch(`${env.url}/auth/login`, {
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
    const request = await fetch(`${env.url}/users/`, {
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