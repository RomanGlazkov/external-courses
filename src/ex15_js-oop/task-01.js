const gift = [];
const sweetness = {
    isTasty: true,
    rustle() {
        console.log("Swish swish!");
    }
};

function Sweet(name, type, weight) {
    this.name = name;
    this.type = type;
    this.weight = weight;
}

Sweet.prototype = sweetness;
Sweet.prototype.crunch = function() {
    if (this.type === 'waffle') {
        console.log('Crisp-crisp!');
    } else {
        console.log("I don't have a waffle!");
    }
};

gift.push(new Sweet('swallow', 'chocolate', 40));
gift.push(new Sweet('alenka', 'waffle', 25));
gift.push(new Sweet('golden key', 'toffee', 50));
gift.push(new Sweet('little red riding hood', 'waffle', 30));

function getWeightOfGift(gift) {
    let result = 0;

    gift.forEach(elem => {
        result += elem.weight;
    });

    return result;
}

function sortGift(gift) {
    return gift.sort((a, b) => a.weight - b.weight);
}

function searchSweet(name, gift) {
    let isFound = false;

    gift.forEach(elem => {
        if (elem.name.search(name.toLowerCase()) !== -1) {
            console.log(elem);
            isFound = true;
        }
    });

    if (!isFound) {
        console.log('Nothing found!');
    }
}