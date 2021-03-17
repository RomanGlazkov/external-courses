function toLowerCamelCase(str) {
    let result = str.split(' ').map((item, index) => {
        return (index > 0 ?
            item[0].toUpperCase() + item.slice(1).toLowerCase() :
            item.toLowerCase()    
        ); 
    });
    return result.join('');
}
module.exports = toLowerCamelCase;