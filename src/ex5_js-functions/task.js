const Calculator = {
    currentValue: 0,

    getResult: function() {
        return this.currentValue;
    },

    reset: function() {
        this.currentValue = 0;
        return this.currentValue;
    },

    add: function(startValue = 0) {
        Calculator.currentValue += startValue;
        return Calculator.add;
    },

    subtract: function(startValue = 0) {
        Calculator.currentValue -= startValue;
        return Calculator.subtract;
    },

    divide: function(startValue = 1) {
        Calculator.currentValue /= startValue;
        return Calculator.divide;
    },

    multiply: function(startValue = 1) {
        Calculator.currentValue *= startValue;
        return Calculator.multiply;
    },
};

module.exports = Calculator;
