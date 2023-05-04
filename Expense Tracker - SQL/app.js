const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const db = require("./utils/database");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(cors());
app.use(bp.json());
db.sync();

app.use(expenseRoutes);

app.listen(8080);
