import {combineReducers } from 'redux';
import devicesReducer from './devicesReducer';

//union of all declared reducers
export default combineReducers({
    devices: devicesReducer
})