function customEvery(array, callback) {
    const result = array.filter(callback);

    return result.length === array.length;
}

module.exports = customEvery;
