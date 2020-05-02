import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import './index.css';
import * as serviceWorker from './serviceWorker';
import './i18n';

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
      <Root />
    </Suspense>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

serviceWorker.unregister();
