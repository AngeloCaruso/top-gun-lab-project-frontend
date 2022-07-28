const url = 'localhost:5000';

export async function getAllCrons() {
    const request = await fetch(`${url}/crons/`);
    return await request.json();
}

export async function findCron(id) {
    const request = await fetch(`${url}/crons/${id}`);
    return await request.json();
}

export async function createCron(cron) {
    const request = await fetch(`${url}/crons/`, {
        method: 'POST',
        body: {
            ...cron
        }
    });
    return await request.json();
}

export async function updateCron(cron) {
    const request = await fetch(`${url}/crons/${cron.id}`, {
        method: 'PATCH',
        body: {
            ...cron
        }
    });
    return await request.json();
}

export async function deleteCron(id) {
    const request = await fetch(`${url}/crons/${id}`, {
        method: 'DELETE'
    });
    return await request.json();
}