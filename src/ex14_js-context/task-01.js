const Calculator = {
    currentValue: 0,

    getResult() {
        return this.currentValue;
    },

    setState(state) {
        if (arguments.length) {
            this.currentValue = state;
        }
        return this;
    },

    reset() {
        this.currentValue = 0;
        return this;
    },

    fetchData(callback) {
        let promise = new Promise((resolve) => {
            if (callback(500)) {
                resolve(500);
            }
        });
        return promise.then(result => this.setState(result));
    },

    add(startValue = 0) {
        this.currentValue += startValue;
        return this;
    },

    subtract(startValue = 0) {
        this.currentValue -= startValue;
        return this;
    },

    divide(startValue = 1) {
        this.currentValue /= startValue;
        return this;
    },

    multiply(startValue = 1) {
        this.currentValue *= startValue;
        return this;
    },
};

module.exports = Calculator;