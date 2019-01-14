// This is primary file for  API
// Here we are building RESTful API in pure nodejs without any  framework
// and library.
// This will indicate whether a site is UP or DOWN by sending SMS on mobile
// phone

//reuired dependencies
var http = require("http");
var url = require("url");

//string decoder modules
var StringDecoder = require("string_decoder").StringDecoder;

//create server and running
var server = http.createServer(function(req, res) {
  //parsed url var
  var parsedUrl = url.parse(req.url, true);
  //extracr relative url path
  var path = parsedUrl.pathname;
  //trim url (slases)
  var trimmedPath = path.replace(/^\/+|\/+$/g, "");

  //extract query  parameters
  var queryStringObject = parsedUrl.query;

  //find methods of request
  var method = req.method.toLowerCase();

  //headers in post request
  var headers = req.headers;

  var decoder = new StringDecoder("utf-8");

  //read payload header in buffer
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
