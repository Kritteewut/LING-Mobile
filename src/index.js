import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/Design';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom'
const AppWithRouter = () => (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
ReactDOM.render(<AppWithRouter />, document.getElementById('root'));
registerServiceWorker();
