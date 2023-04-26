// module.exports = require("path").dirname(process.mainModule.filename);
module.exports = require("path").dirname(require.main.filename);
//process.mainModule is deprecated so we use require.main
//mainModule returns path to the main module of our proj, i.e., app.js
