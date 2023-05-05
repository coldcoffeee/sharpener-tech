const express = require("express");
const parser = require("body-parser");
const cors = require("cors");

const todoDB = require("./utils/db");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors());

app.use(parser.json());

app.use(todoRoutes);

(async () => {
  try {
    await todoDB.sync();
    app.listen(8080);
  } catch (err) {
    console.log(err);
  }
})();
