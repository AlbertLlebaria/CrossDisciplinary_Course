import { combineReducers } from 'redux';
import globalReducer from './global.reducer'
import storeReducer from './store.reducers'

export default combineReducers({
    data: globalReducer,
    API_store: storeReducer
})