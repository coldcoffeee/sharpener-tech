const http = require("http");

const requestHandler = require("./routes");

http.createServer(requestHandler).listen(4000);
