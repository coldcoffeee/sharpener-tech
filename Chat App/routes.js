const fs = require("fs");
// exports.requestHandler = function requestHandler(req, res) {
function requestHandler(req, res) {
  res.setHeader("Content-Type", "text/html");
  if (req.url === "/") {
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
          <form action="/" method="POST">
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
}

// module.exports = requestHandler;
// exports.requestHandler = requestHandler;

module.exports = requestHandler;
