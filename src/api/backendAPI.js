import {gql} from "apollo-boost"
import ApolloClient from 'apollo-boost/lib/index'

const client = new ApolloClient({
    uri: 'https://localhost:4000',
});


export function fetchFood(callback) {
    client
        .query({
            query: gql`
      {
        Food{
          name
        }
      }
    `
        })
        .then(result => callback(result))
        .catch(error => console.log(error));
}