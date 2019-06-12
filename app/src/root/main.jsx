import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './../styles/main.css';


function appRouter(){
    return (
        <h1>Main Component</h1>
    )
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
