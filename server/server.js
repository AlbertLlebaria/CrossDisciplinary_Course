const { ApolloServer, gql } = require('apollo-server');
const { find, filter } = require('lodash');
const { GraphQLScalarType } = require('graphql');
const GraphQLJSON = require('graphql-type-json');
const { Kind } = require('graphql/language');
const { foodDictionary } = require('./utils.js')

const ISODateType = new GraphQLScalarType({
  name: 'ISODate',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value; // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value) // ast value is always in string format
    }
    return null;
  },
})


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  scalar ISODate,
  scalar Coordinate,

  # This "Book" type defines the queryable fields for every book in our data source.
  type Food {
    id:ID!,
    name: String!,
    expiracyDate: ISODate!,
    recievedDate: ISODate!,
    provider: ID!,
    amount: Int!,
    category: String,
    foodHouse: ID!
  },
  type Provider {
    id:ID!,
    name: String!,
    city: String,
    address: String,
    coordinate: Coordinate!
  },
  type FoodHouse {
    id:ID!,
    name: String!
    city: String
    address: String,
    coordinate: Coordinate!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    foods: [Food],
    providers:[Provider],
    foodHouses:[Provider],
    foodFromHouseAndBetween(from: ISODate!, to: ISODate!, store: String!, category:String!):[Food]
  }
  type Mutation{
    postFood(input: CreateFoodInput!): Food!,
    postProvider(input: CreateProviderField!): Food!,
    postFoodHouse(input: CreateFoodHouseField!): Food!
  }
  
  input CreateFoodInput{
    name: String!,
    expiracyDate: ISODate!,
    recievedDate: ISODate!,
    provider: ID!,
    amount: ID!,
    foodHouse: ID!
  },
  input CreateProviderField{
    name: String!
    city: String
    address: String,
    coordinate: Coordinate
  },
  input CreateFoodHouseField{
    name: String!
    city: String
    address: String,
    coordinate: Coordinate
  }
`;

const foods = [{
  id: '0',
  name: 'Banana',
  expiracyDate: "2019-06-15T00:00:00.000Z",
  recievedDate: "2019-05-15T00:00:00.000Z",
  provider: '0',
  amount: 20,
  category: 'Fruits',
  foodHouse: '0'
},
{
  id: '0',
  name: 'Banana',
  expiracyDate: "2019-06-17T00:00:00.000Z",
  recievedDate: "2019-05-16T00:00:00.000Z",
  provider: '0',
  amount: 20,
  category: 'Fruits',
  foodHouse: '0'
},
{
  id: '1',
  name: 'Beff',
  expiracyDate: "2019-06-20T00:00:00.000Z",
  recievedDate: "2019-05-19T00:00:00.000Z",
  provider: '0',
  amount: 10,
  category: 'Meat and alternatives',
  foodHouse: '0'
},
{
  id: '1',
  name: 'Beff',
  expiracyDate: "2019-06-20T00:00:00.000Z",
  recievedDate: "2019-05-18T00:00:00.000Z",
  provider: '0',
  amount: 10,
  category: 'Meat and alternatives',
  foodHouse: '0'
},
{
  id: '1',
  name: 'Apples',
  expiracyDate: "2019-06-15T00:00:00.000Z",
  recievedDate: "2019-05-16T00:00:00.000Z",
  provider: '0',
  amount: 25,
  category: 'Fruits',
  foodHouse: '0'
},
{
  id: '1',
  name: 'Apples',
  expiracyDate: "2019-06-16T00:00:00.000Z",
  recievedDate: "2019-05-17T00:00:00.000Z",
  provider: '0',
  amount: 25,
  category: 'Fruits',
  foodHouse: '0'
},
{
  id: '1',
  name: 'Apples',
  expiracyDate: "2019-06-15T00:00:00.000Z",
  recievedDate: "2019-05-18T00:00:00.000Z",
  provider: '0',
  amount: 30,
  category: 'Fruits',
  foodHouse: '0'
}];

const providers = [
  {
    id: '0',
    name: 'LIDL Den Rode Plads',
    city: 'Kobenhavn N',
    address: 'Norebrogade',
    coordinate: {
      latitude: 45.524548,
      longitude: -122.6749817,
    },
  },
  {
    id: '1',
    name: 'Rema1000 Den Rode Plads',
    city: 'Kobenhavn N',
    address: 'Norebrogade',
    coordinate: {
      latitude: 45.534548,
      longitude: -122.6249817,
    },
  }
];

const foodHouses = [
  {
    id: '0',
    name: 'Den Rode Plads Store',
    city: 'København N',
    address: 'Nørrebrogade 209, 2200',
    coordinate: {
      latitude: 55.699136,
      longitude: 12.541956,
    },
  },{
    id: '2',
    name: 'Jaeggersborg Store',
    city: 'Gentofte',
    address: 'Jaeggersborg Station',
    coordinate: {
      latitude: 55.761799,
      longitude: 12.521603,
    },
  },
  {
    id: '1',
    name: 'Jamers Store',
    city: 'Kobenhavn',
    address: 'Jarmers Plads',
    coordinate: {
      latitude: 55.679062,
      longitude:  12.565472,
    }
    }
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  ISODate: ISODateType,
  Coordinate: GraphQLJSON,
  Query: {
    foods: () => foods,
    providers: () => providers,
    foodHouses: () => foodHouses,
    foodFromHouseAndBetween: (_, input) => {
      let found = [];

      foods.forEach(el => {
        if (el.foodHouse === input.store && el.category === input.category &&
          new Date(el.recievedDate) >= new Date(input.from) || new Date(el.recievedDate) <= new Date(input.to))
          found.push(el)
      })
      return found
    }

  },
  Mutation: {
    postFood: (parent, args) => {
      let cat = 'Other'
      Object.keys(foodDictionary).some(key => {
        if (foodDictionary[key].includes(args.input.name.toLowerCase())) {
          cat = key
          return true
        } else {
          return false
        }
      })
      const link = {
        id: foods.length,
        name: args.input.name,
        expiracyDate: args.input.expiracyDate,
        recievedDate: args.input.recievedDate,
        provider: args.input.provider,
        amount: args.input.amount,
        category: cat,
        foodHouse: args.input.foodHouse
      }
      foods.push(link)
      console.log(foods)

      return link
    }
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs, resolvers, introspection: true,
  playground: true,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});