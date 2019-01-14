/*
 *
 *
 * Create  and export cnfiguration vairiables
 *
 */

//container for all the enviroments
var environments = {};
//staging(default) environemnt
environemnts.staging = {
  port: 3000,
  envName: "staging"
};

environments.production = {
  port: 5000,
  envName: "production"
};

//Determine which enviroment was passed as a command-line arguments

var currentEnviroment =
  typeof process.env.NODE_ENV == "string"
    ? process.env.NODE_ENV.toLowerCase()
    : "";
var enviromentToExport =
  typeof enviroments[currentEnviroment] == "object"
    ? enviroments[currentEnviroment]
    : enviroments.staging;
module.exports = enviromentToExport;
