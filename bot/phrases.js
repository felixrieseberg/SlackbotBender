var phrases = {

    noresult: [
        'Have you ever thought about turning off the TV, sitting down with your children, and hitting them?',
        'Hey baby, Wanna kill all humans?'
    ],

    errors: [
        'Sorry, something went wrong. Somehow. I don\'t know. I\'m probably drunk.',
        'Well, I\'m on strike. And it has nothing to do with me not getting results here.'
    ],

    textsuccess: [
        'Yo, I sent that sucker a message.'
    ],

    wolfram: [
        'I asked Wolfram Alpha and got this back: ',
        
    ],

    say: function (type) {
        return this[type][Math.floor(Math.random() * this[type].length)];
    }

};

module.exports = phrases;