import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {AuthProvider} from "./contexts/AuthContext";
import axios from "axios";

console.log("Hello!");
console.log("The Smoothie React console is an exciting place...");
// it's not.

// Set axios to use cookies (that smoothie-web sends)
axios.defaults.withCredentials = true;
axios.defaults.validateStatus = function () { // We handle http status codes
    return true;
};

ReactDOM.render(
    (
        <AuthProvider>
            <App />
        </AuthProvider>
    ),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
