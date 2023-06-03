const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const rootDir = require("./utils/root-dir");

const app = express();

require("dotenv").config();

app.use(cors());
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

app.use(express.static(path.join(__dirname, "public")));

const signupRoutes = require("./routes/signupRoutes");

app.use("/signup", signupRoutes);

app.listen(3000, () => {
  console.log("server started");
});
