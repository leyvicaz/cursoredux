import React from 'react';
import ReactDOM from 'react-dom';

import Ecommerce from './components/ecommerce';
import configureStore from './configureStore';
import { Provider } from 'react-redux';

const  store = configureStore();
window.store = store;

ReactDOM.render(<Provider store={ store }  ><Ecommerce /></Provider>, document.getElementById('app'));