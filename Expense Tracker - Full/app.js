const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const User = require("./models/user");
const Expense = require("./models/expense");
User.hasMany(Expense);

const app = express();
app.use(cors());
app.use(
  session({
    secret: "someSecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);
app.use(cookieParser());
app.use(bp.json());
app.use(express.static(__dirname + "/public"));

const db = require("./utils/database");
const expenseRoutes = require("./routes/expenseRoutes");
const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes");

(async () => {
  await db.sync({ force: true });

  app.use("/expense", expenseRoutes);
  app.use("/signup", signupRoutes);
  app.use("/login", loginRoutes);

  app.listen(8080, () => {
    console.log("Server running on port 8080");
  });
})();
