const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri = "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function insertData() {
  const myDB = client.db("myDB");
  const myColl = myDB.collection("pizzaMenu");
  const doc = { name: "Neapolitan pizza", shape: "round" };
  const result = await myColl.insertOne(doc);
  console.log(`A document was inserted with the _id: ${result.insertedId}`);
}
insertData().catch(console.dir);

async function readData() {
  const myDB = client.db("myDB");
  const myColl = myDB.collection("pizzaMenu");
  const cursor = myColl.find();
  const results = await cursor.toArray();
  console.log(results);
}
readData().catch(console.dir);
