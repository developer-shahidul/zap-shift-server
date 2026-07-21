const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.39yqdr4.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;
async function connectToDB() {
  try {
    if (db) {
      return db;
    }

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    db = client.db("zap-shift");
    console.log("successfully connected to mongoDB");
    return db;
  } catch (error) {
    console.log("mongoDB server error", error);
    throw error;
  }
}

module.exports = connectToDB;
