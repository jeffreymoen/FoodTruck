This project is built to demonstrate a GraphQL API built in Node.js. It uses the SF Food Truck API as the initial data source and the idea is to improve the functionality over several phases.

Phase 1 - Is a mininum viable product that uses hard coded data as the source for the GraphQL API.

Phase 2 - Is to read the CSV data from https://data.sfgov.org/api/views/rqzj-sfat/rows.csv to populate either a Mongo (NoSQL) or Sqlite DB and then use that DB for the GraphQL API.

* Given the shape of the data and that the intended use is for a GraphQL API, it fits best with a NoSQL approach.
* It makes the most sense to me to continue storing this data in a flattened structure.
* It all belongs to a single domain and breaking it into multiple tables for a relational DB just adds complexity for writing migrations and queries.
* We could store all of the data in a single relational DB table, which would work, but:
*    There are a lot of fields that would need to be searched as text or at least enums and we would need to set up multiple indexes for performance.
*    If the app becomes successful, then NoSQL DBs can handle higher amounts of reads better
*    If th API provider adds or removes fields or if we want to populate this with custom information, perhaps related to GPS boundaries, then it is a better fit for NoSQL

Phase 3 - Is launching the app as a microservice

* This could be deployed as a lambda function/microservice and have a caching layer put in front of it. The records do not change frequently, so caching would be a big benefit here.
* We could then add a script to pull new CSV files and update or replace the DB.
* I would not want to pull the data live from the public API, since it exists on someone else's server and it puts us at risk for any infrastructure issues they have.
* Our frequent API usage could also be a cost-burden for them, so I would rather use the data on a server that I control and pay for. Phase 4 - A front end could be built that consumes this API and lets users visualize the food trucks on a map and use the resolvers I built to search the records types of food, location proximity, etc

Current Status - The project is currently in phase 2.

* There is a working GraphQL API with resolvers and mutations
* There is a seeder built that reads the location data from a CSV file and batch inserts it all to MongoDB
* The GraphQL DB pulls all of it's data from Mongo.
* The next step is adding unit testing using Jest. Normally that would be the first step, but I ran into some issues between Mongo and GraphQL that diverted my attention more towards troubleshooting and getting a working concept over testing.
