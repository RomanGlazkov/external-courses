function toUpperCaseFirstSymbols(str) {
    const result = str.split(' ').map(item => item[0].toUpperCase() + item.slice(1));

    return result.join(' ');
}

module.exports = toUpperCaseFirstSymbols;
