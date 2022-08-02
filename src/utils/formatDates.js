export const formatDatetime = (dateTime) => {
    const date = new Date(dateTime);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
};