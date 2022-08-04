import { env } from '../../config/.env';
import { deleteCookie, getCookie } from '../../utils/cookies.js'

export async function getAllCrons() {
    const request = await fetch(`${env.baseUrl}/crons/`, {
        headers: {
            'Authorization': `Bearer ${getCookie('jwt')}`
        }
    });

    if (request.status === 401) {
        deleteCookie('jwt');
    }

    const response = await request.json();

    return {
        status: request.ok || request.status,
        data: response.data
    }
}

export async function getCron(id) {
    const request = await fetch(`${env.baseUrl}/crons/${id}`, {
        headers: {
            'Authorization': `Bearer ${getCookie('jwt')}`
        }
    });

    if (request.status === 401) {
        deleteCookie('jwt');
    }

    const response = await request.json();

    return {
        status: request.ok || request.status,
        data: response.data
    }
}

export async function createCron(cron) {
    const request = await fetch(`${env.baseUrl}/crons/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getCookie('jwt')}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify(cron),
    });

    if (request.status === 401) {
        deleteCookie('jwt');
    }

    const response = await request.json();

    return {
        status: request.status,
        data: response.data
    }
}

export async function updateCron(cron) {
    const request = await fetch(`${env.baseUrl}/crons/${cron.id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${getCookie('jwt')}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify(cron),
    });
    if (request.status === 401) {
        deleteCookie('jwt');
    }

    const response = await request.json();

    return {
        status: request.status,
        data: response.data
    }
}

export async function deleteCron(id) {
    const request = await fetch(`${env.baseUrl}/crons/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getCookie('jwt')}`
        }
    });

    if (request.status === 401) {
        deleteCookie('jwt');
    }

    const response = await request.json();

    return {
        status: request.ok || request.status,
        data: response.data
    }
}

export async function getLogsByUser() {
    const request = await fetch(`${env.baseUrl}/cron-logs/user`, {
        headers: {
            'Authorization': `Bearer ${getCookie('jwt')}`
        }
    })

    if (request.status === 401) {
        deleteCookie('jwt');
    }

    const response = await request.json();

    return {
        status: request.ok || request.status,
        data: response.data
    }
}

export async function getLogsByCron(id) {
    const request = await fetch(`${env.baseUrl}/cron-logs/${id}`, {
        headers: {
            'Authorization': `Bearer ${getCookie('jwt')}`
        }
    })

    if (request.status === 401) {
        deleteCookie('jwt');
    }

    const response = await request.json();

    return {
        status: request.ok || request.status,
        data: response.data
    }
}