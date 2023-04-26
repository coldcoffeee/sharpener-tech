// const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//this always runs
app.use("/", (req, res, next) => {
  console.log("This always runs");
  next();
});
app.use("/add-product", (req, res, next) => {
  console.log("In the add middleware");
  res.send(
    `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Product Form</title>
        </head>
        <body>
          <form action="/product" method="POST">
            <input type="text" name="name" id="name" />
            <input type="number" name="size" id="size" />
            <button>Submit</button>
          </form>
        </body>
      </html>
  `
  );
});

app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

// http.createServer(app).listen(4000);

app.listen(4000);
