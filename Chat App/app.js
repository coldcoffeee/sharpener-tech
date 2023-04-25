const http = require("http");

const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware 1!");
  next();
});

app.use((req, res, next) => {
  console.log("In the middleware 2!");
  // res.send("<h1>Hellow from Exprexx</h1>");
  res.send({ name: "Mohit" });
});

// http.createServer(app).listen(4000);

app.listen(4000);
