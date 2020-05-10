import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import combinedReducers from './redux';
import Root from './components/root';
import './assets/styles/index.scss';
import * as serviceWorker from './serviceWorker';
import './i18n';

const middleware = [thunk]; // dispatch() functions
let composed;

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger()); // logs actions
  composed = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}
else
  composed = applyMiddleware(...middleware);

const store = createStore(
  combinedReducers,
  composed,
);

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <p>loading...</p>
  </div>
);

// here app catches the suspense from page in case translations are not yet loaded
function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <Root patientId="patient0" />
      </Provider>
    </Suspense>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

serviceWorker.unregister();
