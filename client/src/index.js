import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import States from './components/Context/States'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
    <States>
      
        <App />
        
    </States>,
    document.getElementById('root'))

