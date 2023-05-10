const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const db = require("./utils/database");
const expenseRoutes = require("./routes/.expenseRoutes");
const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/.loginRoutes");

const app = express();

(async () => {
  try {
    db.sync();
    app.use(cors());
    app.use(bp.json());

    app.use("/expenses", expenseRoutes);
    app.use("/signup", signupRoutes);
    app.use("/login", loginRoutes);

    app.listen(8080);
  } catch (err) {
    console.log("Error syncing the database: ", err);
  }
})();
