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
var config = require("./config");
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

    //choose the handler to  send for a particular request if not any route send to 404
    var chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;
    var data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: buffer
    };

    chosenHandler(data, function(statusCode, payload) {
      statusCode = typeof statusCode == "number" ? statusCode : "200";
      payload = typeof payload == "object" ? payload : {};

      var payloadString = JSON.stringify(payload);
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
      console.log("Returning the response :", statusCode, payloadString);
    });
  });
});

server.listen(config.port, function() {
  console.log(
    `The server is listening on port ${config.port} in ${config.envName} mode`
  );
});

//defines the handlers
var handlers = {};

handlers.sample = function(data, callback) {
  callback(406, { name: "sample handler" });
};
handlers.notFound = function(data, callback) {
  callback(404);
};
//define a request router
var router = {
  sample: handlers.sample
};
