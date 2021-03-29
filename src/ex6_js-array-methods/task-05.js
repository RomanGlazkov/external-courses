function customMap(array, callback) {
    const result = [];

    array.forEach((item, index, array) => {
        result.push(callback(item, index, array));
    });

    return result;
}

module.exports = customMap;
