const Addr = require('./addr');

module.exports = class Abn {

    constructor(){
        this.id = null;
        this.name = null;
        this.inn = null;
        this.kpp = null;
        this.okopf = null;
        this.dogs = [];
        this.lawAddr = new Addr();
        this.resAddr = new Addr();
    }
}

