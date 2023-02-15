import './bootstrap';
import ReactDOM from 'react-dom/client';

import {BrowserRouter} from 'react-router-dom'
import App from './app';
import '../css/index.css'

ReactDOM.createRoot(document.getElementById('app')).render(
    <BrowserRouter basename='/'>
        <App/>
    </BrowserRouter>
)


// import './bootstrap';
// import React from 'react';
// import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import App from './app';
// import '../css/index.css';

// function Root() {
//   return (
//     <BrowserRouter basename="/">
//       <App />
//     </BrowserRouter>
//   );
// }

// render(<Root />, document.getElementById('app'));
