import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD9dxLLOAyNFSWIeU9U9tOzhF-qjn9jov8",
    authDomain: "catch-of-the-day-e7e8c.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-e7e8c.firebaseio.com"
})

const base = Rebase.createClass(firebase.database());

//named export
export { firebaseApp }

//default export
export default base;