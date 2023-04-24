const http = require("http");

const listener = function (req, res) {
  res.setHeader("Content-Type", "text/html");
  const method = req.method;
  if (req.url === "/") {
    res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Form</title>
    </head>
    <body>
        <form action="/message" method="POST">
            <div id="messages"></div>
            <h2 style="display: inline;">Enter your message:&nbsp;</h2>
            <input type='text' name="message">
            <br>
            <br>
            <button>Submit</button>
        </form>
    </body>
    </html>
    `);
    return res.end();
  } else if (req.url === "/message" && method === "POST") {
    const fs = require("fs");
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    //an event listener on req when data stream ends
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const msg = parsedBody.split("=")[1];
      const oldData = fs.readFileSync("message.txt").toString();
      fs.writeFileSync("message.txt", msg + "<br>" + oldData);
      res.statusCode = 200;
      res.setHeader("Location", "/");
      res.setHeader("Content-Type", "text/html");
      const entries = fs.readFileSync("message.txt").toString();
      console.log(entries);
      res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Form</title>
    </head>
    <body>
        <form action="/message" method="POST">
            <div id="messages">${entries}</div>
            <h2 style="display: inline;">Enter your message:&nbsp;</h2>
            <input type='text' name="message">
            <br>
            <br>
            <button>Submit</button>
        </form>
    </body>
    </html>
    `);
      return res.end();
    });
  }
  res.end();
};

http.createServer(listener).listen(4000);
