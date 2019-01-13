// This is primary file for  API
// Here we are building RESTful API in pure nodejs without any  framework
// and library.
// This will indicate whether a site is UP or DOWN by sending SMS on mobile
// phone
var http = require("http");
var url = require("url");
var server = http.createServer(function(req, res) {
  var parsedUrl = url.parse(req.url, true);

  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");

  res.end("Hello world\n");

  console.log("Request received on path: " + trimmedPath);
});

server.listen(3000, function() {
  console.log("The server is listening on port 3000");
});
