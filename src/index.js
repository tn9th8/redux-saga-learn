import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './components/App';
import reducers from './reducers';
import reportWebVitals from './reportWebVitals';
import rootSaga from './sagas';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://rem.dbwebb.se/api';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const root = ReactDOM.createRoot(document.getElementById('root'));

sagaMiddleware.run(rootSaga);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
