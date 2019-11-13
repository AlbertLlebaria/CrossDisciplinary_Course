import {
    FETCH_FOOD_BETWEEN_RANGE,
    FETCH_FOOD_HOUSES,
    FETCH_PROVIDERS,
    CLEAR_FORM,
    FORM_FIELD_CHANGE,
    FECTH_FOOD,
    CLEAR_FOOD
} from '../actions/store.actions'

const parseDate = (d = new Date()) => {
    let month = (d.getMonth() + 1),
        day = d.getDate(),
        year = d.getFullYear();

    return `${year}-${month}-${day}`;
}


const initSateForm = {
    name: ' ',
    expiracyDate: parseDate(),
    recievedDate: parseDate(),
    provider: '0',
    foodHouse: '0',
    barcode: null,
    amount: '0'
}

const initialState = {
    providers: [],
    foodHouses: [],
    food: [],
    formFields: { ...initSateForm }
};

export const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_FOOD:
            return {
                ...state,
                food: []
            }
        case FECTH_FOOD:
            return {
                ...state,
                food: action.food
            }
        case FORM_FIELD_CHANGE:
            return {
                ...state,
                formFields: {
                    ...state.formFields,
                    [action.key]: action.value
                }
            }
        case CLEAR_FORM:
            return {
                ...state,
                formFields: {
                    ...initSateForm
                }
            }
        case FETCH_FOOD_BETWEEN_RANGE:
            return {
                ...state,
            }
        case FETCH_FOOD_HOUSES:
            return {
                ...state,
                foodHouses: action.foodHouses
            }
        case FETCH_PROVIDERS:
            return {
                ...state,
                providers: action.providers
            }
        default:
            return state
    }
};

export default storeReducer