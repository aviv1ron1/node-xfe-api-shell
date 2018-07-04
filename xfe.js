#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const commander = require('commander');
const inquirer = require('inquirer');
const DEFAULT_API = "https://api.xforce.ibmcloud.com/";
var config;

var startApp = () => {
    commander
        .description('query xfe api via command line')
        .command('whois <domain>', 'query domain whois')
        .alias("w")
        .command('url', 'Return a list of URLs according to the category and date range')
        .parse(process.argv);
}

try {
    config = require('./config.json');
    if (!config.key || !config.password || !config.base) {
        throw {};
    }
    startApp();
} catch (err) {
    console.error("in order to use this tool you must first enter your api key and password");
    inquirer.prompt([{
        type: "input",
        name: "key",
        message: "enter api key",
    }, {
        type: "input",
        name: "pass",
        message: "enter api password"
    }, {
        type: "confirm",
        name: "base",
        message: "the default base url for the api is: '" + DEFAULT_API + "' would you like to keep it?",
        default: false
    }]).then(answers => {
        var gotAllAnswers = (k, p, b) => {
            config = {
                key: k,
                password: p,
                base: b
            }
            fs.writeFile(path.resolve(__dirname, "config.json"), JSON.stringify(config), (err) => {
                if (err) {
                    console.error("error writing settings to file", err);
                    process.exit(1);
                } else {
                    startApp();
                }
            })
        }
        if (answers.base) {
            gotAllAnswers(answers.key, answers.pass, DEFAULT_API);
        } else {
            inquirer.prompt([{
                name: "url",
                message: "enter new base xfe api url"
            }]).then(baseUrlAns => {
                if (baseUrlAns.url.slice(-1) != "/") {
                    baseUrlAns.url += "/";
                }
                gotAllAnswers(answers.key, answers.pass, baseUrlAns.url);
            });
        }
    });
}