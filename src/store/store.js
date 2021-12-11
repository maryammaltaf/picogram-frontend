import {createStore} from 'redux'
import buttonApp from './buttons/buttons'
import button from './buttons/buttons';
import count from './follow-count/follow-count';
import { combineReducers } from 'redux';



const myApp = combineReducers({
    button, count
});

const store = createStore(myApp);

export default store;