function printArrayItems(arr) {
    arr.forEach(function(item, index) {
        console.log(`Item ${index + 1} = ${item}`);
    });
    console.log(`Array length: ${arr.length}`);
    return;
}
module.exports = printArrayItems;