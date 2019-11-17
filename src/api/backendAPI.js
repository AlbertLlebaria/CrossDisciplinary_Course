import { gql } from "apollo-boost"
import ApolloClient from 'apollo-boost/lib/index'
import Constants from 'expo-constants';

const { manifest } = Constants;
const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:4000`)
  : `http://enigmatic-refuge-22568.herokuapp.com:45123/`;

console.log(api)

const client = new ApolloClient({
  uri: `http://${api}`,
});


export const fetchFood = (callback) => {
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

/**
 * 
 * @param {function(boolean,object)} callback 
 */
export const fetchProviders = (callback) => {
  client
    .query({
      query: gql`
      {
        providers{
          id,
          name,
          city,
          address,
          coordinate,
        }
      }
    `
    })
    .then(result => callback(false, result.data.providers))
    .catch(error => callback(true, error));
}


export const fetchFoodHouses = (callback) => {
  client
    .query({
      query: gql`
      {
        foodHouses{
          id,
          name,
          city,
          address,
          coordinate 
        }
      }
    `
    })
    .then(result => callback(false, result.data.foodHouses))
    .catch(error => console.log(true, error));
}
/**
 * 
 * @param {Object} RegisteredFood 
 * @param {*} callback 
 */
export const postFood = (RegisteredFood, callback) => {
  console.log(RegisteredFood)
  let nameField = RegisteredFood.barcode !== null ?
    `barcode: "${RegisteredFood.barcode}"` :
    `name: "${RegisteredFood.name}"`

  client
    .mutate({
      mutation: gql`mutation {
        postFood(input:{
          ${nameField},
          expiracyDate: "${RegisteredFood.expiracyDate}"
          recievedDate: "${RegisteredFood.recievedDate}",
          provider: "${RegisteredFood.provider}",
          amount: ${RegisteredFood.amount},
          foodHouse: "${RegisteredFood.foodHouse}"
        })
          {
             name
          }
      }
  `
    })
    .then(result => {
      callback(false, result)
    })
    .catch(error => {
      callback(true, error)
    });

}

export const fetchFoodFromStoreBetweenDates = (filters, callback) => {
  client
    .query({
      query: gql`{
      foodFromHouseAndBetween(
        from: "${filters.from}",
        to: "${filters.to}",
        store: "${filters.store}",
        category: "${filters.category}"
        ) {
          name,
          category,
          recievedDate,
          amount,
      }
    }
`
    })
    .then(result => {
      callback(false, result.data.foodFromHouseAndBetween)
    })
    .catch(error => {
      callback(true, error)
    });
}

export const fetchFoodFromProvider = (provider, date, callback) => {
  client
    .query({
      query: gql`{
        foodFromProvider(
        provider: "${provider}",
        recievedDate: "${date}"
        ) {
          id,
          name,
          expiracyDate,
          recievedDate,
          amount,
          category,
          foodHouse,
          provider
      }
    }
`
    })
    .then(result => {
      callback(false, result.data.foodFromProvider)
    })
    .catch(error => {
      callback(true, error)
    });
}

export const fetchFoodFromFoodHouse = (foodHouse,date, callback) => {
  client
    .query({
      query: gql`{
        foodFromStore(
          foodHouse: "${foodHouse}",
          recievedDate: "${date}"
        ) {
          id,
          name,
          expiracyDate,
          recievedDate,
          amount,
          category,
          provider,
          foodHouse
      }
    }
`
    })
    .then(result => {
      callback(false, result.data.foodFromStore)
    })
    .catch(error => {
      callback(true, error)
    });
}