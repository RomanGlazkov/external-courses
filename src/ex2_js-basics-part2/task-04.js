function compareElements(arr) {
    let set = new Set();
    arr.forEach(function(item) {
        set.add(item);
    });
    return set.size > 1 ? false : true;
}
module.exports = compareElements;