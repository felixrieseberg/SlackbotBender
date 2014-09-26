var phrases = {

    noresult: [
        'Have you ever thought about turning off the TV, sitting down with your children, and hitting them?',
        'Hey baby, Wanna kill all humans?'
    ],

    errors: [
        'Sorry, something went wrong. Somehow. I don\'t know. I\'m probably drunk.',
        'Well, I\'m on strike. And it has nothing to do with me not getting results here.'
    ],

    wolfram: [
        'I asked Wolfram Alpha and got this back: ',
        
    ],

    say: function (type) {

        switch (type) {
            case 'noresult':
                return this.noresult[Math.floor(Math.random() * this.noresult.length)];
            case 'error':
                return this.errors[Math.floor(Math.random() * this.errors.length)];
            case 'wolfram':
                return this.wolfram[Math.floor(Math.random() * this.wolfram.length)];
            default:
                break;
        }
    }

};

module.exports = phrases;