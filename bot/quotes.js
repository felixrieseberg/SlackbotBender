var quotes = {

    benderQuotes: [
        'Have you ever thought about turning off the TV, sitting down with your children, and hitting them?',
        'Hey baby, Wanna kill all humans?'
    ],

    bender: function () {
        var quote = this.benderQuotes[Math.floor(Math.random() * this.benderQuotes.length);
        return quote;
    }

}

module.exports = quotes;