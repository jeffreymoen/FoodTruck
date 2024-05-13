/**
* The plan here is to add Jest testing that uses mocked GraphQL API responses.
* The main goal is to test the resolvers and queries to verify that they behave as expected.
* Beyond that I would almost validate the schema and types expected for data.
*/

const mockedGetAllLocations = {
  "data": {
    "getAllLocations": [
      {
        "_id": "66416928cf229c4ffeda4e00",
        "address": "5 THE EMBARCADERO",
        "applicant": "Ziaurehman Amini",
        "facilityType": "Push Cart",
        "foodItems": ""
      },
      {
        "_id": "66416928cf229c4ffeda4e01",
        "address": "201 BAY SHORE BLVD",
        "applicant": "Reecees Soulicious",
        "facilityType": "Truck",
        "foodItems": "Fried Chicken: Fried Fish: Greens: Mac & Cheese: Peach Cobbler: and String beans"
      },
      {
        "_id": "66416928cf229c4ffeda4e02",
        "address": "8 10TH ST",
        "applicant": "The Chef Station",
        "facilityType": "Truck",
        "foodItems": "South American/Peruvian food"
      },
    ]
  }
};
