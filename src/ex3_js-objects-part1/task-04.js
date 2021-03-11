function addProperty(str, obj) {
    let result = obj;
    if (str in result === false) {
        result[str] = 'new';
    }
    return result;
}
module.exports = addProperty;