var express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./dal.js");

app.use(express.static("public"));
app.use(cors());

app.get("/account/create/:name/:email/:password", function (req, res) {
  dal
    .create(req.params.name, req.params.email, req.params.password)
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

// not being used
// app.get("/account/login/:name/:email/:password", function (req, res) {
//   res.send({
//     email: req.params.email,
//     password: req.params.password,
//   });
// });

app.get("/account/all/", function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

var port = 3000;
app.listen(port, function () {
  console.log("Server running at http://localhost:" + port);
});
