// Returns deep clone of an object
export const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}
