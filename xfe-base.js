'use-strict'

const request = require('request');
const util = require('util');
const EventEmitter = require("events").EventEmitter;
const config = require('./config.json');

class xfeBase {
    constructor() {
        this.baseReq = request.defaults({
            auth: {
                user: config.key,
                pass: config.password
            },
            baseUrl: config.base,
            json: true
        });
    }

    get() {
        this.baseReq.apply(null, arguments);
    }
}

module.exports = xfeBase;