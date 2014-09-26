var quotes = {

    benderQuotes: [
        'Have you ever thought about turning off the TV, sitting down with your children, and hitting them?',
        'Hey baby, wanna kill all humans?',
        'Stupid can opener! You killed my father, and now you\'ve come back for me!',
        'I support and oppose many things, but not strongly enough to pick up a pen.',
        'Here\'s your Guttenberg Bible, masters, plus the Colonel\'s secret recipe: "Chicken, grease, salt".',
        'What do ya got there, numbers?',
        'I accept this Nobel Peace Prize not just for myself, but for crime robots everywhere. Skoal!',
        'Hey. What kind of party is this? There\'s no booze and only one hooker.',
        'Come on, universe, you big, mostly empty wuss! Give me all the juice you got!',
        '[shreds wine list] No poison for us, thanks. I\'ll stick with good-old mineral oil. [drinks mineral oil]',
        'In the name of all that is good and logical, we give thanks for the chemical energy we are about to absorb. To quote the prophet Jerematic, one-zero-zero-zero-one-zero-one-zero-one-zero-one-zero-one...',
        'Hey. Do I preach at you when you\'re lying stoned in the gutter?',
        'Yeah, well... I\'m gonna go build my own theme park, with blackjack and hookers. In fact, forget the park!',
        'Come on, it\'s just like making love. Y\'know... left, down, rotate sixty-two degrees, engage rotor... ',
        'Oh, no room for Bender, huh? Fine! I\'ll go build my own lunar lander, with blackjack and hookers. In fact, forget the lunar lander and the blackjack. Ahh, screw the whole thing!',
        'What do you mean "we", mammal?',
        'Hey, look what I won off some tourist\'s pocket.',
        'Bite my shiny metal ass!',
        '[singing] Fry crack corn, and I don\'t care / Leela crack corn, I still don\'t care / Bender crack corn, and he is great / Take that, you stupid corn!',
        'I was a hero to broken robots \'cause I was one of them, but how can I sing about being damaged if I\'m not? That\'s like Christina Aguilera singing Spanish. Ooh, wait! That\'s it! I\'ll fake it!',
        'Hey, the blues. The tragic sound of other people\'s suffering. That\'s kind of a pick-me-up.',
        'That is so wrong! You can\'t melt down broken robots, not right when they\'re kissing my ass!',
        'Grab a shovel. I\'m one skull short of a Mouseketeer reunion.',
        'Wouldn\'t it make sense to weld everyone except me to the wall?'
    ],

    bender: function () {
        var quote = this.benderQuotes[Math.floor(Math.random() * this.benderQuotes.length)];
        return quote;
    }

};

module.exports = quotes;