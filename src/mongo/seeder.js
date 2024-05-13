/**
 * Next Steps:
 * - The data should be sanitized before being entered into the DB
 * - I would want to reuse the same connection logic for the seeder that was used in mongo/index.js
 * -- I alternatively could have chosen to seed the data directly through a GraphQL mutation,
 *    which would have avoided the connection code duplication, but I wanted to show multiple ways of
 *    writing to the DB (GraphQL mutations and adding a batch of collections through Mongo)
 * - I could explore changing the food item strings into keywords to perhaps make the data more searchable.
 * - I would want to be able to run the seeder multiple times without it duplicating data.
 * - All of the data from the CSV could be written to the DB, since data that may not be useful now could
 *   have value in the future and the tradeoffs for storing more data are different with a NoSQL DB than a relational DB.
 * - I could setup the script to automatically pull the latest version of the CSV when seeding the DB.
 * -- Or rather than downloading the CSV, I could explore live or more frequent updates of the data.
 */
import fs from "fs";
import { parse } from "csv-parse";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const filePath = "src/mongo/Mobile_Food_Facility_Permit.csv";
let batchLocations = [];

function getLocations(filePath) {
  return new Promise((resolve, reject) => {
    let locations = [];

    // This is running asynchronously, so it would return an empty array before it finished running.
    // The solution was to wrap this in a promise and set the value returned to the promise to an
    // external variable.
    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        const location = {
          locationId: row[0],
          applicant: row[1],
          facilityType: row[2],
          address: row[5],
          foodItems: row[11],
          latitude: row[14],
          longitude: row[15],
          schedule: row[17],
          daysHours: row[18],
          expirationDate: row[22],
          zipCodes: row[28],
        };

        locations.push(location);
      })
      .on("end", function () {
        resolve(locations);
      })
      .on("error", function (err) {
        reject(err);
      });
  });
}

async function addBatchOfLocations(batchLocations) {
  if (!batchLocations.length) {
    console.log("There are no locations to seed to the server");
    return;
  }

  try {
    const client = new MongoClient(process.env.MONGO_URI);

    await client.connect();

    const db = client.db("foodfinder");
    const locations = db.collection("locations");
    const options = { ordered: true };

    // With ~500 food carts in the data set, it makes more sense to add them all as a batch,
    // than as a separate requests.
    const results = await locations.insertMany(batchLocations, options);
    console.log(
      `${results.insertedCount} documents were inserted into locations`
    );
  } catch (err) {
    console.log(err);
  }
}

getLocations(filePath)
  .then((locations) => {
    batchLocations = locations;
    addBatchOfLocations(batchLocations);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
