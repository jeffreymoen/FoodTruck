/**
 * Next Steps:
 * - More mutations could be added. There is already a create mutation, but updating or deleting locations
 *   would also be useful & I could see users wanting to add, edit, or delete locations.
 * - I would want to add a location based search using the GPS and other location information.
 * - More resolvers could be added to improve search via the API.
 * - There is currently only one model, but we could expand this by adding users, reviews, discounts,
 *   ACL, and other premium features
 * - I could enforce stricter typing with TypeScript
 */
import { ObjectId } from "mongodb";

export const typeDef = `#graphql
    type Location {
        _id: ID!,
        locationId: Int,
        applicant: String!,
        facilityType: String!,
        address: String!,
        foodItems: String!,
        latitude: Float!,
        longitude: Float!,
        schedule: String!,
        daysHours: String!,
        expirationDate: String!,
        zipCodes: String!
    }

    type Query {
        getAllLocations: [Location!]!
        getLocation(id: ID!): Location!,
        # getLocationByLocationId(locationId: Int!): Location!
        # locationsByFoodItems(foodItem:String!): [Location!]!,
        # locationsByFacilityType(facilityType:String!): [Location!]!
        # locationsByZipCode(zipCode:String!): [Location!]!
    }

    type Mutation {
        createLocation(location: NewLocationInput!): Location
    }

    input NewLocationInput {
        locationId: Int!, 
        applicant: String!, 
        facilityType: String!, 
        address: String!, 
        foodItems: String!, 
        latitude: Float!, 
        longitude: Float!,
        schedule: String!,
        daysHours: String!,
        expirationDate: String!,
        zipCodes: String!
    }
`;

export const resolvers = {
  Query: {
    getAllLocations: (parent, args, { mongo }) => {
      return mongo.locations.find().toArray();
    },
    getLocation: async (_, { id }, { mongo }) => {
      return await mongo.locations.findOne({ _id: new ObjectId(id) });
    },
    // getLocationByLocationId: async (obj, { locationId }, { mongo }) => {
    //   return await mongo.locations.find(
    //     (location) => location.locationId === locationId
    //   );
    // },
  },

  Mutation: {
    createLocation: async (_, { location }, { mongo }) => {
      try {
        const response = await mongo.locations.insertOne(location);
        return { id: response.insertedId, ...location };
      } catch (error) {
        console.log(error);
      }
    },
  },
};
