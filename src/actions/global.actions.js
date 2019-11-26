export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const CLEAN_ERROR = 'CLEAN_ERROR';

export const throw_error = (err) => {
    return {type: SET_ERROR, error: err}
};

export const startLoading = () => {
    return {type: START_LOADING}
};
export const stopLoading = (err) => {
    return {type: STOP_LOADING}
};
export const userLogin = (credentials, token) => {
    return {type: LOG_IN}
};

export const userLogout = () => {
    return {type: LOG_OUT}
};


export const cleanError = () => {
    return {type: CLEAN_ERROR}
};