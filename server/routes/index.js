// routes/index.js
import fs from "fs";
const validFileTypes = ['js'];

let requireFiles = function(directory, app, config, db) {
  fs.readdirSync(directory).forEach(function(fileName) {
    // Recurse if directory
    if (fs.lstatSync(directory + '/' + fileName).isDirectory()) {
      requireFiles(directory + '/' + fileName, app, config, db);
    } else {

      // Skip this file
      if (fileName === 'index.js' && directory === __dirname) return;

      // Skip unknown filetypes
      if (validFileTypes.indexOf(fileName.split('.').pop()) === -1) return;

      // Require the file.
      require(directory + '/' + fileName)(app, config, db);
    }
  });
};

module.exports = function(app, config, db) {
  requireFiles(__dirname, app, config, db);
};
