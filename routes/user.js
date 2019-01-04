const url = require('url');
const Profile = require("../profile");
const Renderer = require('../utils/Renderer');

//Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {

    const renderer = new Renderer(response);

    const pathname =  url.parse(request.url).pathname;
    const username = pathname.replace(/^\/+/, "/").split("/")[1];

    if (username && username.length && request.method === 'GET') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');

        const studentProfile = new Profile(username);
        studentProfile.on("end", function(json) {

            // show profile
            var values = {
                avatarUrl: json.gravatar_url,
                username: json.profile_name,
                badges: json.badges.length,
                javascriptPoints: json.points.JavaScript
            };

            renderer.render('profile', values);
        });

        studentProfile.on("error", function(err) {
            const values = {
                errorMessage: err.message
            };
            renderer.render(['error', 'search'], values);
        });
    }
  }
  
  module.exports = user;