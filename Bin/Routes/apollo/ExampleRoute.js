"use strict";
class ExampleRoute {
    constructor() {
        this.RequestMethod = 'ALL';
    }
    Callback(_request, response, _resumeFunction) {
        return response.send({
            data: []
        });
    }
}
module.exports = new ExampleRoute();
