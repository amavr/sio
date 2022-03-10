const oracledb = require('oracledb');
const cfg = require('../cfg');
const log = require('log4js').getLogger('DB  ');

async function initialize(onStart) {

    oracledb.extendedMetaData = true;
    oracledb.autoCommit = true;
    oracledb.fetchAsString = [oracledb.CLOB];
    oracledb.poolTimeout = 10;
    oracledb.queueTimeout = 10000;
    oracledb.poolPingInterval = 5;

    await oracledb.createPool(cfg.hrPool);

    if(onStart) onStart({
        OracleDB: oracledb.version,
        Client: oracledb.oracleClientVersionString,
        Database: cfg.db_name.toUpperCase()
    });
}

async function close() {
    await oracledb.getPool().close();
}

module.exports.initialize = initialize;
module.exports.close = close;
