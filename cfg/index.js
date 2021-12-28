const cfg = require('./cfg.json');

cfg.hrPool = cfg.db_list[cfg.db_name];
cfg.hrPool.connectString = cfg.hrPool.cs.join('\n');
delete cfg.hrPool.cs;

module.exports = cfg;