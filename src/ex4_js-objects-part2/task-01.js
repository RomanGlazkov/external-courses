function findPrototypeProperty(key, obj) {
    let value;
    if (!obj.hasOwnProperty(key)) {
        value = obj[key];
    }
    return value;
}
module.exports = findPrototypeProperty;