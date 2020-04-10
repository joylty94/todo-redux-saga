import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { applyMiddleware, compose, createStore } from 'redux';
import Main from './containers/main';
import * as firebase from 'firebase';
import createSagaMiddleware from 'redux-saga';
import mySaga from './saga';
import dotenv from "dotenv";
dotenv.config();

function App() {
  const sagaMiddleware = createSagaMiddleware() 
  const middlewares = [sagaMiddleware];
  const enhancer = compose(
    applyMiddleware(...middlewares),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  );
  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(mySaga);

  console.log(process.env.REACT_APP_APP_ID)

  var app = firebase.initializeApp({ 
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  });

  return (
    <Provider store={store}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
