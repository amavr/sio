const logConfig = require('./services/logging.js');
const webServer = require('./services/server.js');
const db = require('./services/ora.js');

async function startup() {
    try {
        const log = await logConfig.initialize('ROOT');

        const ofs = 10;
        log.info("".padEnd(32, '='));
        log.info("NODE_ENV: ".padStart(ofs) + process.env.NODE_ENV);
        log.info("Platform: ".padStart(ofs) + process.platform);
        log.info("Version: ".padStart(ofs) + process.version);
        log.info("Arch: ".padStart(ofs) + process.arch);
        
        await db.initialize();
        await webServer.initialize();

    } catch (err) {
        console.error(err);

        process.exit(1); // Non-zero failure code
    }
}


async function shutdown(e) {
    let err = e;

    console.log('Shutting down');

    try {
        await webServer.close();
        console.log('Web server stopped');
        await db.close();
        console.log('DB Connections closed');
    } catch (e) {
        console.log('Encountered error', e);

        err = err || e;
    }

    console.log('Exiting process');

    if (err) {
        process.exit(1); // Non-zero failure code
    } else {
        process.exit(0);
    }
}

process.on('SIGTERM', () => {
    console.log('Received SIGTERM');

    shutdown();
});

process.on('SIGINT', () => {
    console.log('Received SIGINT');

    shutdown();
});

process.on('uncaughtException', err => {
    console.log('Uncaught exception');
    console.error(err);

    shutdown(err);
});

startup();