//Problem: We need a simple way to look at a user's badge count and JavaScript point from a web browser
//Solution: Use Node.js to perform the profile look ups and server our template via HTTP

//1. Create a web server
const http = require('http');
const Routes = require("./routes");

const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((request, response) => {
  new Routes(request, response);
}); 

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});