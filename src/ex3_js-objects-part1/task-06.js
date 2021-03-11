function deepCloneObj(obj) {
    let clone = (obj instanceof Array) ? [] : {};
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            clone[key] = deepCloneObj(obj[key]);
        } else {
            clone[key] = obj[key];
        }
    }
    return clone;
}
module.exports = deepCloneObj;