//this contains bsisc methods to wirte and delete into the file
var fs = require("fs");
var path = require("path");

var lib = {};

lib.baseDir = path.join(__dirname, "/../.data/");

//write data to a file
lib.create = function(dir, file, data, callback) {
  //Open the file for writing
  fs.open(lib.baseDir + dir + "/" + file + ".json", "wx", function(
    err,
    fileDescriptor
  ) {
    if (!err && fileDescriptor) {
      //convert data to string
      var stringData = JSON.stringify(data);

      fs.writeFile(fileDescriptor, stringData, function(err) {
        if (!err) {
          fs.close(fileDescriptor, function(err) {
            if (!err) {
              callback(false);
            } else {
              callback("Error while closing new file");
            }
          });
        } else {
          callback("Error writing new file");
        }
      });
    } else {
      callback("Could not create new file, it may be already exist");
    }
  });
};
lib.read = function(dir, file, callback) {
  fs.readFile(lib.baseDir + dir + "/" + file + ".json", "utf8", function(
    err,
    data
  ) {
    callback(err, data);
  });
};

lib.update = function(dir, file, data, callback) {
  fs.open(lib.baseDir + dir + "/" + file + ".json", "r+", function(
    err,
    fileDescriptor
  ) {
    if (!err && fileDescriptor) {
      var stringData = JSON.stringify(data);
      fs.truncate(fileDescriptor, function(err) {
        if (!err) {
          fs.write(fileDescriptor, stringData, function(err) {
            if (!err) {
              fs.close(fileDescriptor, function(err) {
                if (!err) {
                  callback(false);
                } else {
                  callback("Error closing the file");
                }
              });
            } else {
              callback("Error writing into the file");
            }
          });
        } else {
          callback("Error truncate the file");
        }
      });
    } else {
      callback("could not open the file for updating or it may not exist");
    }
  });
};

lib.delete = function(dir, file, callback) {
  fs.unlink(lib.baseDir + dir + "/" + file + ".json", function(err) {
    if (!err) {
      callback(false);
    } else {
      callback("error in deleting the file");
    }
  });
};
module.exports = lib;
