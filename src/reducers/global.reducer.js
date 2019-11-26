import {
    LOG_IN,
    LOG_OUT,
    START_LOADING,
    STOP_LOADING,
    CLEAN_ERROR,
    SET_ERROR
} from '../actions/global.actions'

const initialState = {
    credentials: {
        name: "",
        password: ""
    },
    isLogged: false,
    isLoading: false,
    error: null
};

export const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                isLogged: true,
                credentials: action.credentials
            };
        case LOG_OUT:
            return {
                ...state,
                credentials: initialState.credentials,
                isLogged: false
            };
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case STOP_LOADING:
            return {
                ...state,
                isLoading: false
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            };
        case CLEAN_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state
    }
};

export default globalReducer