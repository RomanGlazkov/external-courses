function countElements(arr) {
    let evenNumbers = 0;
    let oddNumbers = 0;
    let zeros = 0;
    arr.forEach(function(item) {
        if (typeof item === 'number' && !isNaN(item)) {
            if (item === 0) {
                zeros++;
            } else if (item % 2 === 0) {
                evenNumbers++;
            } else {
                oddNumbers++;
            }
        }
    });
    return [evenNumbers, oddNumbers, zeros];
}
module.exports = countElements;