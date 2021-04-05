function customFilter(array, callback) {
    const result = [];
    
    array.forEach((item, index, array) => {
        if (callback(item, index, array)) {
            result.push(item);
        }
    });

    return result;
}

module.exports = customFilter;
