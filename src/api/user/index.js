export async function login() {
    const request = await fetch(`${url}/crons/`);
    return await request.json();
}