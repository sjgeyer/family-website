import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';
import thunk from './lib/thunk';

import './index.css';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
