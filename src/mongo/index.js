import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Create MongoClient
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function setupDatabase() {
  try {
    // Connect to the MongoDB Atlas server
    await client.connect();
    const db = client.db("foodfinder");

    return {
      client,
      db,
      locations: db.collection("locations"),
    };
  } catch (error) {
    console.log("Error connecting to the databased");

    return {};
  }
}
