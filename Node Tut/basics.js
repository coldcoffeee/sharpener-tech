const http = require("http");

const listener = function (req, res) {
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
    res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NodeJS</title>
    </head>
    <body>
        <h1 style="display: inline;">Welcome</h1>
        <h2 style="display: inline;">&nbsp;to my NodeJS project!</h2>
    </body>
    </html>
    `);
  } else if (req.url === "/home") {
    res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NodeJS</title>
    </head>
    <body>
        <h1 style="display: inline;">Welcome</h1>
        <h2 style="display: inline;">&nbsp;home!</h2>
    </body>
    </html>
    `);
  } else if (req.url === "/about") {
    res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NodeJS</title>
    </head>
    <body>
        <h1 style="display: inline;">Welcome</h1>
        <h2 style="display: inline;">&nbsp; to about us page!</h2>
    </body>
    </html>
    `);
  } else if (req.url === "/node") {
    res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>NodeJS</title>
    </head>
    <body>
        <h1 style="display: inline;">Welcome</h1>
        <h2 style="display: inline;">&nbsp; to my NodeJS project!</h2>
    </body>
    </html>
    `);
  }
  console.log(req.url);
  res.end();
};

http.createServer(listener).listen(4000);
