const express = require("express");
const bp = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.post("/", (req, res, next) => {
  let chats = fs.readFileSync("./chat.txt").toString();
  if (!chats) chats = "Messages appear here:<br>";
  if (req.body.message) {
    chats += req.body.user + ": " + req.body.message + "<br>";
    fs.writeFileSync("./chat.txt", chats);
    return res.redirect("/");
    // page reload karne pe previous method se call hota hai page with previous form data
  } else {
    console.log(req.body);
  }
  res.send(`
    <html>
        <head><title>Chat</title></head>
            <body>
                <div>
                    ${chats}
                </div>
                <form method = "POST" action="/">
                    <input type="hidden" name="user" id="user" required>
                    <input type="text" name="message" placeholder="message" id="message">
                    <button> Send </button>
                </form>
                <script>
                    document.getElementById("user").value = localStorage.getItem("user");
                </script>
            </body>
        </html>
    `);
});

app.get("/login", (req, res, next) => {
  res.send(`
        <html>
            <head><title>Login</title></head>
            <body>
                <form method = "POST" action="/">
                    <input name="user" id="user" required placeholder="username">
                    <button> Login </button>
                </form>
                <script>
                if(localStorage.getItem("user")) {
                    document.querySelector("input").value = localStorage.getItem("user");
                    document.querySelector("form").submit();
                }
                    document.querySelector("button").addEventListener("click",()=>{
                        localStorage.setItem("user", document.getElementById("user").value);
                    }); 
                </script>
            </body>
        </html>
    `);
});

app.get("/", (req, res, next) => {
  res.redirect("/login");
});

app.listen(8080);
