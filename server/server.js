const {ApolloServer, gql} = require('apollo-server');
const {find, filter} = require('lodash');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Food {
    name: String!,
    expiracyDate: String,
    recievedDate: String,
    provider: Provider,
    amount: Int,
    foodHouse: FoodHouse
  },
  type Provider {
    name: String!
    city: String
    address: String
  },
  type FoodHouse {
    id: String!
    city: String
    address: String
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    foods: [Food],
    providers:[Provider],
    foodHouses:[Provider]
  }
  type Mutation {
    updateFood (
      name: Int!
    ): Food
  }
`;
const foods = [
    {
        name: 'Harry Potter and the Chamber of Secrets',
        provider: 'J.K. Rowling',
    },
    {
        name: 'Jurassic Park',
        provider: 'Michael Crichton',
    },
];

const providers = [
    {
        name: 'Fakta',
        city: 'Kobenhavn',
    },
    {
        name: 'Netto',
        provider: 'Kobenhavn S',
    },
];
const foodHouses = [
    {
        id: 'Fakta',
        city: 'Kobenhavn',
    },
    {
        id: 'Netto',
        provider: 'Kobenhavn S',
    },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        foods: () => foods,
        providers: () => providers,
        foodHouses: () => foodHouses,
    },
    Mutation: {
        updateFood: (_, {postId}) => foods
    }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({typeDefs, resolvers});

// The `listen` method launches a web server.
server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});