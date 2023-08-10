const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
let db = null;

MongoClient.connect(url, (err, client) => {
  console.log("Connected successfully to server");

  // connect to myproject
  db = client.db("myproject");
});

// create user account
function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const mycollection = db.collection("users");
    const doc = { name, email, password, balance: 0 };
    mycollection.insertOne(doc, (err, result) => {
      err ? reject(err) : resolve(result);
    });
  });
}

// all users
function all() {
  return new Promise((resolve, reject) => {
    const mycollection = db.collection("users");
    mycollection.find({}).toArray((err, docs) => {
      err ? reject(err) : resolve(docs);
    });
  });
}

module.exports = { create, all };
