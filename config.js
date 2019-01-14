/*
 *
 *
 * Create  and export cnfiguration vairiables
 *
 */

//container for all the enviroments
var environments = {};
//staging(default) environemnt
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: "staging"
};

environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: "production"
};

//Determine which enviroment was passed as a command-line arguments

var currentEnviroment =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";
var enviromentToExport =
  typeof environments[currentEnviroment] == "object"
    ? environments[currentEnviroment]
    : environments.staging;
module.exports = enviromentToExport;
