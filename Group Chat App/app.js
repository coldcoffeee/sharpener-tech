const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const rootDir = require("./utils/root-dir");
const mysql = require("mysql2/promise");
const db = require("./utils/db");
const bodyParser = require("body-parser");

const app = express();

require("dotenv").config();

app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    methods: ["GET", "POST"],
  })
);
app.use(
  session({
    secret: "sekretcey987123",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes");

app.use("/signup", signupRoutes);
app.use("/login", loginRoutes);
app.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});
(async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "wordpass123",
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS chat_app;`);

  console.log("here");
  // await db.sync({ force: true });
  await db.sync();

  app.listen(3000, () => {
    console.log("server started");
  });
})();
