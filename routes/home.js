const Profile = require("../profile");
const Renderer = require("../utils/Renderer");
const qs = require('querystring');


//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
    if (request.url === '/' && request.method === "GET") {

      const renderer = new Renderer(response);
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');
     
      renderer.render("search");
      
    } else if (request.url === '/' && request.method === "POST") {
      
      
      const renderer = new Renderer(response);
      response.statusCode = 200;
      response.setHeader('Content-Type', 'text/html');

      let body = '';
      request.on('data', function (data) {
        body += data;
      });

      request.on('end', function (data) {
        // const username = body.split("&")[0].split("=")[1];

        const formData = qs.parse(body);
        const username = formData.username;

        const url = `http://localhost:4000/${username}`;

        response.writeHead(303, {
          Location: url
        });

        response.end();
      });

    }
}

module.exports = home;