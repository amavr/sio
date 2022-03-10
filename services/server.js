const http = require('http');
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const log = require('log4js').getLogger('WEB ');
const cfg = require('../cfg');
const routes = require('../routes');


// const ofs = 10;
// log.info("".padEnd(32, '='));
// log.info("NODE_ENV: ".padStart(ofs) + process.env.NODE_ENV);
// log.info("Platform: ".padStart(ofs) + process.platform);
// log.info("Version: ".padStart(ofs) + process.version);
// log.info("Arch: ".padStart(ofs) + process.arch);
// log.info("OracleDB: ".padStart(ofs) + oracledb.versionString);
// log.info("Client: ".padStart(ofs) + oracledb.oracleClientVersionString);
// log.info("".padEnd(32, '='));

let server;

function initialize(onStart) {
    return new Promise((resolve, reject) => {
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));
        app.use('/api', routes);

        app.get('/', (req, res) => {
            res.end('Hello World!');
        });


        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            next(createError(404));
        });

        // error handler
        app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500).json('Sorry, not found');
        });

        server = http.createServer(app);
        server.startCallback = onStart;

        server.on('error', onError);
        server.on('listening', onListening);

        server.listen(cfg.port);
    });
}

function onListening() {
    require('dns').lookup(require('os').hostname(), function (err, host, fam) {
        if (err) {
            log.info(err);
        }
        else {
            if(server.startCallback) server.startCallback(host, cfg.port);
        }
    })
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof cfg.port === 'string'
        ? 'Pipe ' + cfg.port
        : 'Port ' + cfg.port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            log.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            log.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function close() {
    return new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
}

module.exports.initialize = initialize;
module.exports.close = close;
