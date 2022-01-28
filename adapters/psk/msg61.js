const Abn = require('../../models/abn');

class Msg61 {

    static decode(msg){
        const abn = new Abn();
        // ...
        return abn;
    }

    static encode(abn){
        const msg = {};
        // ...
        return msg;
    }

}

module.exports = Msg61;