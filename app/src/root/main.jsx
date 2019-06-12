import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './../styles/main.css';
import Main from './../components/Main'
import Company from './../components/Company';


function appRouter(){
    return (<Company/>)
}

function run() {
    ReactDOM.render(
        appRouter()
        , document.getElementById('root'));
}

const loadedStates = ['complete', 'loaded', 'interactive'];
if ((loadedStates.indexOf(document.readyState) != -1) && document.body) {
    run();
} else {
    window.addEventListener('DOMContentLoaded', run, false);
}
