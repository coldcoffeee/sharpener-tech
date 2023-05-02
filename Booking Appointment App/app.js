const express = require("express");
const cors = require("cors");
const sequelize = require("sequelize");
const bp = require("body-parser");

const db = require("./util/db");
const userRoutes = require("./routes/user");

const app = express();

db.sync();
app.use(cors());
app.use(bp.json());

app.use("/user", userRoutes);

app.listen(8080);
