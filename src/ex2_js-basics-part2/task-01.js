function checkTypeOfArg(param) {
    if (typeof param === 'string') {
        return 'string';
    } else if (isNaN(param)) {
        return undefined;
    } else if (typeof param === 'number') {
        return 'number';
    }
    return undefined;
}
module.exports = checkTypeOfArg;