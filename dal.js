const MongoClient = require("mongodb").MongoClient;

const DB_URL = "mongodb://localhost:27017";
const DATABASE_NAME = "myproject";
let db;

// Connect to MongoDB
MongoClient.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("MongoDB connected");
    db = client.db(DATABASE_NAME);
  })
  .catch((err) => console.error(err));

function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const userCollection = db.collection("users");
    const doc = { name, email, password, balance: 0 };
    userCollection
      .insertOne(doc)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function all() {
  return new Promise((resolve, reject) => {
    const userCollection = db.collection("users");
    userCollection
      .find()
      .toArray()
      .then((users) => {
        resolve(users);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = { create, all };
