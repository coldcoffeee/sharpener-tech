const express = require("express");
const path = require("path");

const rootDir = require("../util/root-dir");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  console.log("In the add middleware");
  //   res.send(
  //     `<!DOCTYPE html>
  //         <html lang="en">
  //         <head>
  //         <meta charset="UTF-8" />
  //         <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //         <title>Product Form</title>
  //           </head>
  //           <body>
  //           <form action="/admin/add-product" method="POST">
  //           <input type="text" name="name" id="name" />
  //           <input type="number" name="size" id="size" />
  //           <button>Submit</button>
  //             </form>
  //             </body>
  //             </html>
  //             `
  //   );

  // res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});
module.exports = router;
