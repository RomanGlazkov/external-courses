function customReduce(array, callback, initialValue) {
    let previousValue = initialValue;
    let index = 0;
    
    if (initialValue === undefined) {
        previousValue = array[0];
        index = 1;
    }
    for (let i = index; i < array.length; i++) {
        previousValue = callback(previousValue, array[i], i, array);
    }

    return previousValue;
}

module.exports = customReduce;
