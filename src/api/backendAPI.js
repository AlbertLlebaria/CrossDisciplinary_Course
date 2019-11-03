import {gql} from "apollo-boost"
import ApolloClient from 'apollo-boost/lib/index'

const client = new ApolloClient({
    uri: 'https://localhost:4000',
});


export const fetchFood = (callback)=>{
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

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

export const postFood = (food,callback)=>{
  client
    .q
}