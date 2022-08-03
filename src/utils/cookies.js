export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const deleteCookie = (name) => {
    const cookieValue = getCookie(name);
    document.cookie = `${name}=${cookieValue}; max-age=0`;
}