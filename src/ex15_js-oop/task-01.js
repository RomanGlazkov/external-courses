const gift = [];
const sweetness = {
    rustle() {
        console.log("Swish swish!");
    },
    crunch() {
        if (this.type === 'waffle') {
            console.log('Crisp-crisp!');
        } else {
            console.log("I don't have a waffle!");
        }
    }
};

function Sweet(name, weight) {
    this.name = name;
    this.weight = weight;
    this.isTasty = true;
}

Sweet.prototype = sweetness;

function Candy(name, weight, type, color) {
    Sweet.call(this, name, weight);
    this.type = type;
    this.color = color;
}

Candy.prototype = new Sweet();

function Marmalade(name, weight, taste) {
    Sweet.call(this, name, weight);
    this.taste = taste;
}

Marmalade.prototype = new Sweet();

gift.push(new Sweet('marshmallow', 80));
gift.push(new Candy('alenka', 25, 'waffle', 'green'));
gift.push(new Candy('golden key', 50, 'toffee', 'yellow'));
gift.push(new Marmalade('worms', 60, 'apple'));

function getWeightOfGift(gift) {
    let result = gift.reduce((sum, sweetness) => sum + sweetness.weight, 0);

    return result;
}

function sortGift(gift) {
    return gift.sort((a, b) => a.weight - b.weight);
}

function searchSweetness(name, gift) {
    let sweetness = gift.find(elem => elem.name.search(name.toLowerCase()) !== -1);

    return sweetness ? console.log(sweetness) : console.log('Nothing found!');
}