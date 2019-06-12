import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './../styles/login.css';
import Login from './../components/Login'

function run() {
    ReactDOM.render(
        <Login/>
        , document.getElementById('apple'));
}

const loadedStates = ['complete', 'loaded', 'interactive'];
if ((loadedStates.indexOf(document.readyState) != -1) && document.body) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}
