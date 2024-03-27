import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './redux/store';

import App from './components/App/App';


const root = ReactDOM.createRoot(document.getElementById('react-root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
);

// Turned of StrictMode to cean up console (causes double-logs)