// This is primary file for  API
// Here we are building RESTful API in pure nodejs without any  framework
// and library.
// This will indicate whether a site is UP or DOWN by sending SMS on mobile
// phone
var http = require("http");
var url = require("url");
var StringDecoder = require("string_decoder").StringDecoder;

var server = http.createServer(function(req, res) {
  var parsedUrl = url.parse(req.url, true);

  var path = parsedUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");
  var queryStringObject = parsedUrl.query;
  var method = req.method.toLowerCase();
  var headers = req.headers;

  var decoder = new StringDecoder("utf-8");
  var buffer = "";
  req.on("data", function(data) {
    buffer += decoder.write(data);
  });
  req.on("end", function() {
    buffer += decoder.end();

    res.end("Hello world\n");

    console.log(
      "Request received on path: " +
        trimmedPath +
        " with method " +
        method +
        " with query parameters :" +
        queryStringObject
    );
    console.log("Headers are :" + headers);
    console.log("Payload is " + buffer);
  });
});

server.listen(3000, function() {
  console.log("The server is listening on port 3000");
});
