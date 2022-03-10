const Addr = require('./addr');

module.exports = class Dog {

    constructor(){
        this.id = null;
        this.num = null;
        this.begDt = null;
        this.endDt = null;
        this.addr = new Addr();
        this.objects = [];
    }

}