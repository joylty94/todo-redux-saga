import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { applyMiddleware, compose, createStore } from 'redux';
import Main from './containers/main';
import * as firebase from 'firebase';
import createSagaMiddleware from 'redux-saga';
import mySaga from './saga';


function App() {
  const sagaMiddleware = createSagaMiddleware() 
  const middlewares = [sagaMiddleware];
  const enhancer = compose(
    applyMiddleware(...middlewares),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  );
  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(mySaga);

  var app = firebase.initializeApp({ 
    apiKey: "AIzaSyDvgm7kMm1iYD7S9wMlp9YGGxl3yIYMZ6M",
    authDomain: "redux-saga-tutorial.firebaseapp.com",
    databaseURL: "https://redux-saga-tutorial.firebaseio.com",
    projectId: "redux-saga-tutorial",
    storageBucket: "redux-saga-tutorial.appspot.com",
    messagingSenderId: "621727465052",
    appId: "1:621727465052:web:1064756c4bbb22c9aff099"
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
