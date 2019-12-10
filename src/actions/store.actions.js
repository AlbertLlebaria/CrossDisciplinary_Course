import * as SLL_API from '../api/backendAPI'
import {
throw_error
}from './global.actions'
export const FETCH_FOOD_HOUSES = 'FETCH_FOOD_HOUSES';
export const FETCH_PROVIDERS = 'FETCH_PROVIDERS';
export const FETCH_FOOD_BETWEEN_RANGE = 'FETCH_FOOD_BETWEEN_RANGE';
export const POST_FOOD = 'POST_FOOD';
export const SET_BARCODE = 'SET_BARCODE';
export const CLEAR_BARCODE = 'CLEAR_BARCODE';
export const CLEAR_FORM = 'CLEAR_FORM';
export const FORM_FIELD_CHANGE = 'FORM_FIELD_CHANGE';
export const FECTH_FOOD = 'FECTH_FOOD';
export const CLEAR_FOOD = 'CLEAR_FOOD';

import {stopLoading,startLoading} from './global.actions'

export function postFood() {
    return {
        type: POST_FOOD
    }
}

export function clearFood() {
    return {
        type: CLEAR_FOOD,
    }
}
export function handleFormChange(key,value) {
    return {
        type: FORM_FIELD_CHANGE,
        key,
        value
    }
}
export function receivedFood(food) {
    return {
        type: FECTH_FOOD,
        food
    }
}

export function clearForm() {
    return {
        type: CLEAR_FORM,
    }
}


export function receivedFoodHouses(foodHouses) {
    return {
        type: FETCH_FOOD_HOUSES,
        foodHouses
    }
}

export function receivedProviders(providers) {
    return {
        type: FETCH_PROVIDERS,
        providers
    }
}

export function fetchProviders() {

    return function (dispatch) {
        dispatch(startLoading())
        return SLL_API.fetchProviders((err, result) => {
            dispatch(stopLoading())
            if (!err) {
                dispatch(receivedProviders(result))
            }else{
                dispatch(throw_error(result))
            }
        })
    }
}

export function fetchFoodHouses() {
    return function (dispatch) {
        dispatch(startLoading())
        return SLL_API.fetchFoodHouses((err, result) => {
            if (!err) {
                dispatch(receivedFoodHouses(result))
            }else{
                dispatch(throw_error(result))
            }
            dispatch(stopLoading())
        })
    }
}


export function fetchFoodFromStoreBetweenDates(filters) {
    return function (dispatch) {
        dispatch(startLoading())
        return SLL_API.fetchFoodFromStoreBetweenDates(filters,(err, result) => {
            if (!err) {
                dispatch(receivedFood(result))
            }else{
                dispatch(throw_error(result))
            }
            dispatch(stopLoading())
        })
    }
}
export function fetchFoodFromProvider(provider,date) {
    return function (dispatch) {
        dispatch(startLoading())
        return SLL_API.fetchFoodFromProvider(provider,date,(err, result) => {
            if (!err) {
                dispatch(receivedFood(result))
            }else{
                dispatch(throw_error(result))
            }
            dispatch(stopLoading())
        })
    }
}

export function postFoodRequest(food){
    return function (dispatch) {
        return SLL_API.postFood(food, (err, result) => {
            dispatch(startLoading())
            if (!err) {
                dispatch(postFood())
            }else{
                dispatch(throw_error(result))
            }
            dispatch(stopLoading())
        })
    }
}