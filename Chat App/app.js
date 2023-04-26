const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// "/admin/*"
app.use("/admin", adminRoutes);
app.use(shopRoutes);

//sequence of above two routes can be interchanged and the output will be unaffected
//this is because shopRoutes handles a get request and when we use get/post instead of use,
//the URL passed is exactly matched and doesn't behave like if an app.use("/hello") is encountered,
//then app.use handles all urls starting with "/hello", e.g. "/hello-world" but this doesn't happen with
//app.get or post, in their case, exact matches are made

//finally when control reaches here, means invalid url
//catch all route
// app.use((_, res) => res.status(404).send("<h1>Error! Page Not Found</h1>"));

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(4000);
