function checkMaxElement(arr) {
    let max = 0;
    arr.forEach(function(item) {
        if (item > max) {
            max = item;
        }
    });
    return max;
}
module.exports = checkMaxElement;