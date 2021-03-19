function addString(str, substr, pos) {
    let result = str.split(' ');

    result.splice(pos + 1, 0, substr);

    return result.join(' ');
}

module.exports = addString;
