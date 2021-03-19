function deleteSpaces(str) {
    if (str[0] === ' ' && str[str.length - 1] === ' ') {
        return str.slice(1, -1);
    } else if (str[0] === ' ') {
        return str.slice(1);
    } else if (str[length - 1] === ' ') {
        return str.slice(-1);
    }
    
    return str;
}

module.exports = deleteSpaces;
