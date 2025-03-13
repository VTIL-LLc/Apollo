"use strict";
class Index {
    constructor() {
        this.RequestMethod = 'ALL';
    }
    Callback(_request, response, _resumeFunction) {
        return response.sendStatus(200);
    }
}
module.exports = new Index();
