function isPrimeNumber(num) {
    if (num > 1000 || typeof num !== 'number' || isNaN(num)) {
        return 'Данные неверны'
    }
    if (num === 0 || num === 1) {
        return 'Вы ввели 0 или 1. Эти числа особенные'
    }
    let n = 2;
    while (n < num) {
        if (num % n === 0) {
            return `Число ${num} - составное число`;
        }
        n++;
    }
    return `Число ${num} - простое число`;
}
module.exports = isPrimeNumber;