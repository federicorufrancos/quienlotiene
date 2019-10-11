import { createStore, compose, combineReducers } from 'redux';
import 'firebase/firestore';

//firebase
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyDEOKZ4sRoyBxOINw35UVJ0mYSfBkjz_wc",
    authDomain: "whohasit-69b68.firebaseapp.com",
    databaseURL: "https://whohasit-69b68.firebaseio.com",
    projectId: "whohasit-69b68",
    storageBucket: "",
    messagingSenderId: "375958373343",
    appId: "1:375958373343:web:6d6034483e5a6894aaba6a"
};

firebase.initializeApp(firebaseConfig);

const rrfConfig = {
    userProfile: 'user',
    useFirestoreForProfile: true
}

const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

const initialState = {};

const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

store.subscribe(() => {
    console.log('algo cambio');
});

export default store;