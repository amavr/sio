const oracledb = require('oracledb');
const cfg = require('../cfg');
const log = require('log4js').getLogger('DB  ');

async function initialize() {

    oracledb.extendedMetaData = true;
    oracledb.autoCommit = true;
    oracledb.fetchAsString = [oracledb.CLOB];
    oracledb.poolTimeout = 10;
    oracledb.queueTimeout = 10000;
    oracledb.poolPingInterval = 5;

    const ofs = 10;
    log.info("OracleDB: ".padStart(ofs) + oracledb.versionString);
    log.info("Client: ".padStart(ofs) + oracledb.oracleClientVersionString);
    log.info("DB name: ".padStart(ofs) + cfg.db_name.toUpperCase());

    await oracledb.createPool(cfg.hrPool);
}

async function close() {
    await oracledb.getPool().close();
}

module.exports.initialize = initialize;
module.exports.close = close;
