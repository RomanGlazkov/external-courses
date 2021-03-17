function cutString(str, num) {
    let result;
    if (str.length > num) {
        result = str.slice(0, num - 1) + '\u2026';  
    } else {
        result = str;
    }
    return result;
}
module.exports = cutString;