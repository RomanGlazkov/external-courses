function customSome(array, callback) {
    const result = array.filter(callback).length;
    
    return !!result;
}

module.exports = customSome;
