const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const contactUsRoutes = require("./routes/contactus");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// this makes "./public/" a public directory accessible by client, basically for client,
// the public dir will behave as root dir, so html pages can access public's content's through
//  relative paths
app.use(express.static(path.join(__dirname, "public")));

// "/admin/*"
app.use("/admin", adminRoutes);
app.use(contactUsRoutes);
app.use(shopRoutes);

//sequence of above two routes can be interchanged and the output will be unaffected
//this is because shopRoutes handles a get request and when we use get/post instead of use,
//the URL passed is exactly matched and doesn't behave like if an app.use("/hello") is encountered,
//then app.use handles all urls starting with "/hello", e.g. "/hello-world" but this doesn't happen with
//app.get or post, in their case, exact matches are made

//finally when control reaches here, means invalid url
//catch all route
// app.use((_, res) => res.status(404).send("<h1>Error! Page Not Found</h1>"));

app.use(require("./controllers/404").get404);

app.listen(4000);
//fuser 4000/tcp -k

//
