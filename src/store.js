import  { createStore } from 'redux';
import reducer from './reducers';

const initialState = [];

const store = createStore(
    reducer,
    //initial state,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    console.log('algo cambio');
});

export default store;