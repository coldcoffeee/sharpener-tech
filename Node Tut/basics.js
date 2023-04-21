const http = require("http");

const listener = function (req, res) {
  console.log("Mohit Kumar Gupta");
};

http.createServer(listener).listen(4000);
