const Calculator = {
    currentValue: 0,

    getResult: function() {
        return this.currentValue;
    },

    setState: function(state) {
        if (arguments.length) {
            this.currentValue = state;
        }
        return this;
    },

    reset: function() {
        this.currentValue = 0;
        return this;
    },

    fetchData: function(callback) {
        let promise = new Promise((resolve) => {
            if (callback(500)) {
                resolve(500);
            }
        });
        return promise.then(result => this.setState(result));
    },

    add: function(startValue = 0) {
        this.currentValue += startValue;
        return this;
    },

    subtract: function(startValue = 0) {
        this.currentValue -= startValue;
        return this;
    },

    divide: function(startValue = 1) {
        this.currentValue /= startValue;
        return this;
    },

    multiply: function(startValue = 1) {
        this.currentValue *= startValue;
        return this;
    },
};

module.exports = Calculator;