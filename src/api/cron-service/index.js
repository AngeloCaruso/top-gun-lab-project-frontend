import { env } from '../../config/.env';
import { deleteCookie, getCookie } from '../../utils/cookies.js'

export async function getAllCrons() {
    const request = await fetch(`${env.url}/crons/`, {
        headers: {
            'Authorization': `Bearer ${getCookie('jwt')}`
        }
    });

    if (request.status == 401) {
        deleteCookie('jwt');
    }

    const response = await request.json();

    return {
        status: request.ok || request.status,
        data: response.data
    }
}

export async function findCron(id) {
    const request = await fetch(`${env.url}/crons/${id}`, {
        headers: {
            'Authorization': `Bearer ${getCookie('jwt')}`
        }
    });

    return await request.json();
}

export async function createCron(cron) {
    const request = await fetch(`${env.url}/crons/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getCookie('jwt')}`,
            'content-type': 'application/json'
        },
        body: JSON.stringify(cron),
    });
    return  request;
}

export async function updateCron(cron) {
    const request = await fetch(`${env.url}/crons/${cron.id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${getCookie('jwt')}`
        },
        body: {
            ...cron
        }
    });
    return await request.json();
}

export async function deleteCron(id) {
    const request = await fetch(`${env.url}/crons/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getCookie('jwt')}`
        }
    });

    if (request.status == 401) {
        deleteCookie('jwt');
    }

    const response = await request.json();

    return {
        status: request.ok || request.status,
        data: response.data
    }
}

export async function getLogsByUser() {
    const request = await fetch(`${env.url}/cron-logs/user`, {
        headers: {
            'Authorization': `Bearer ${getCookie('jwt')}`
        }
    })

    if (request.status == 401) {
        deleteCookie('jwt');
    }

    const response = await request.json();

    return {
        status: request.ok || request.status,
        data: response.data
    }
}

export async function getLogsByCron(id) {
    const request = await fetch(`${env.url}/cron-logs/${id}`, {
        headers: {
            'Authorization': `Bearer ${getCookie('jwt')}`
        }
    })

    if (request.status == 401) {
        deleteCookie('jwt');
    }

    const response = await request.json();

    return {
        status: request.ok || request.status,
        data: response.data
    }
}