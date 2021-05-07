function Hangman(word) {
    const letters = word.toLowerCase().split('');
    const guessedLetters = letters.map(elem => {
        let newElem = elem;
        newElem = '_';
        return newElem;
    });
    const wrongLetters = [];
    
    this.errorsLeft = 6;
    this.guess = function(letter) {
        if (letters.includes(letter)) {
            letters.forEach((item, index) => {
                if (item === letter) {
                    guessedLetters[index] = letter;
                }
            });
            if (guessedLetters.includes('_')) {
                console.log(guessedLetters.join(''));
            } else {
                console.log(`${guessedLetters.join('')} | You won!`);
            }
        } else {
            wrongLetters.push(letter);
            this.errorsLeft--;
            console.log(`wrong letter, errors left ${this.errorsLeft} | ${wrongLetters.join(',')}`);
        }
        return this;
    };
    this.getGuessedString = function() {
        return guessedLetters.join('');
    };
    this.getErrorsLeft = function() {
        return this.errorsLeft;
    };
    this.getWrongSymbols = function() {
        return wrongLetters;
    };
    this.getStatus = function() {
        return `${this.getGuessedString()} | errors left ${this.errorsLeft}`;
    };
    this.startAgain = function(newWord) {
        return new Hangman(newWord);
    }
}

module.exports = new Hangman;