function customSlice(array, begin = 0, end = array.length) {
    const result = [];
    const startValue = begin >= 0 ? begin : array.length + begin;
    const endValue = end >= 0 ? end : array.length + end;

    array.forEach((item, index) => {
        if (index >= startValue && index < endValue) {
            result.push(item);
        }
    });

    return result;
}

module.exports = customSlice;
