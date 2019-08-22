const commander = require('commander');
const xfeBase = require('./xfe-base.js');
const moment = require('moment');

commander.option("-f --from-date <date>", "start date", moment().subtract(1, 'days').toISOString());
commander.option("-t --to-date <date>", "end date", moment().toISOString());
commander.parse(process.argv);

commander.on('--help', function() {
    console.log('Returns the list of domains in early warning feed.');
    console.log('Access to this information is restricted to trial, commercial API and enterprise users.');
    console.log(' for more details see https://api.xforce.ibmcloud.com/doc/#Early_Warning_get_url_host_early_warning');
    console.log('');
});

var xfe = new xfeBase();

var qs = {
    startDate: commander.fromDate,
    endDate: commander.toDate
}

xfe.get('url/host/early_warning', {
    qs: qs
}, (err, response, body) => {
    if (err) {
        console.error("error", err);
    } else {
        if (response.statusCode != 200) {
            console.log("non success response", response.statusCode, body);
        } else {
            if (commander.view) {
                console.log("success", body);
            } else {
                body.rows.forEach(r => { console.log(r); });
            }

        }
    }
});