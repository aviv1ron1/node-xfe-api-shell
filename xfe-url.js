const commander = require('commander');
const xfeBase = require('./xfe-base.js');
const moment = require('moment');

commander.option("-f --from-date <date>", "start date", moment().subtract(1, 'days').toISOString());
commander.option("-t --to-date <date>", "end date", moment().toISOString());
commander.option("-c --category <category>", "category between 0 to 7", 0);
commander.option("-l --limit [limit]", "limit number of results");
commander.option("-s --skip [skip]", "skip number of results");
commander.option("-v --view", "show full view");
commander.parse(process.argv);

const categories = [
    "Illegal Activities",
    "Computer Crime / Hacking",
    "Warez / Software Piracy",
    "Violence / Extreme",
    "Spam URLs",
    "Malware",
    "Phishing URLs",
    "Botnet Command and Control Server"
]

commander.on('--help', function() {
    console.log('  categories:');
    console.log('');
    for (var i = 0; i < categories.length; i++) {
        console.log(i, categories[i]);
    };
    console.log('');
});

var xfe = new xfeBase();

var qs = {
    category: categories[commander.category],
    startDate: commander.fromDate,
    endDate: commander.toDate
}

if (commander.limit) {
    qs.limit = commander.limit;
}

if (commander.skip) {
    qs.skip = commander.skip;
}

xfe.get('url', {
    qs: qs
}, (err, response, body) => {
    if (err) {
        console.error("url error", err);
    } else {
        if (response.statusCode != 200) {
            console.log("url status error", response.statusCode, body);
        } else {
            if (commander.view) {
                console.log("success", body);
            } else {
                body.rows.forEach(r => { console.log(r.url, r.created); })
            }

        }
    }
});