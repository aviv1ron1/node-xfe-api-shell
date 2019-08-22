const commander = require('commander');
const xfeBase = require('./xfe-base.js');
const moment = require('moment');

commander.parse(process.argv);

commander.on('--help', function() {
    console.log('Returns live and passive DNS records.');
    console.log('');
});

var xfe = new xfeBase();

xfe.get('resolve/' + encodeURIComponent(commander.args[0]), (err, response, body) => {
    if (err) {
        console.error("error", err);
    } else {
        if (response.statusCode != 200) {
            console.log("non success response", response.statusCode, body);
        } else {
            if (commander.view) {
                console.log("success", body);
            } else {
                if(body.Passive) {
                    console.log("passive: ", body.Passive.query);
                    body.Passive.records.forEach(r => {
                        console.log(r);
                    })
                    delete body.Passive;
                }
                console.log(body);
            }
        }
    }
});