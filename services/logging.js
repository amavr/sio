const log4js = require('log4js');
const path = require('path');
const cfg = require('../cfg');

async function initialize(tag) {
    log4js.configure({
        appenders: {
            app: { type: 'dateFile', filename: path.join(cfg.log_dir, 'md.log'), pattern: '.yyyy-MM-dd', daysToKeep: 7 },
            console: { type: 'console' }
        },
        categories: {
            default: { appenders: ['app', 'console'], level: "ALL" }
        }
    });
    // log.level = 'debug';

    return log4js.getLogger(tag);
}

module.exports.initialize = initialize;
