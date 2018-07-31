const Command = require('../../cmd/Command.js');
const Router = require('../../router/Main.js').Router;
const C = require('../../util/console.js');
const util = require('../../util/util.js');
const Parser = require('../../reactions/CommandParser.js');
const Embed = require('../../util/embed.js');
const leven = require('leven');

let LevenRouter = new Router();

LevenRouter.stop((data, next) => {
    let path = __dirname + '/../../img/icon_maths.png';
    let arg1 = '',
        arg2 = '';
    if (data.cmdArgs[1].startsWith('"')) {
        arg1 = data.full.match(/"[^"]*"/)[0];
        arg1 = arg1.substring(1, arg1.length - 1);
        let newstr = Array.from(data.cmdArgs).splice(1).reduce((a, v) => a + (a === '' ? '' : ' ') + v, '').substring(arg1.length + 2);
        if ((/^ *"/).test(newstr)) {
            arg2 = newstr.match(/"[^"]*"/)[0];
            arg2 = arg2.substring(1, arg2.length - 1);
        } else arg2 = (/[^ ]*/).exec(newstr)[0];
    } else {
        arg1 = data.cmdArgs[1];
        if (data.cmdArgs[2].startsWith('"')) {
            arg2 = data.full.match(/"[^"]*"/)[0];
            arg2 = arg2.substring(1, arg2.length - 1);
        } else arg2 = data.cmdArgs[2];
    }
    console.log(arg1, arg2);
    data.message.channel.send({
        embed: {
            color: 0xc4ced8,
            author: {
                icon_url: 'attachment://maths.png',
                name: 'Levenshtein string distance: ' + leven(arg1, arg2),
            }
        },
        files: [{
            attachment: path,
            name: 'maths.png'
        }]
    });
    next();
});

let LevenCommand = new Command(/^leven$|^levenshtein$/, LevenRouter, {
    desc: 'Calculates the levenshtein distance between strings.'
});

module.exports = LevenCommand;
