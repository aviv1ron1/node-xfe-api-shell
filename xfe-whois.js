const commander = require('commander');
const xfeBase = require('./xfe-base.js');

commander.parse(process.argv);

if (commander.args.length < 1) {
    console.error("domain name is required");
    process.exit(1);
}
var domain = commander.args;
var xfe = new xfeBase();

xfe.get('whois/' + commander.args[0], (err, response, body) => {
    if (err) {
        console.log("whois error", err);
    } else {
        if (response.statusCode != 200) {
            console.log("whois error", response.statusCode, body);
        } else {
            console.log("success", body);
        }
    }
});