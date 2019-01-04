const home = require('./home');
const user = require('./user');


class Routes {
    constructor(request, response) {
        home(request, response);
        user(request, response);
    }
}

module.exports = Routes;