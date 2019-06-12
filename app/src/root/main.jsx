import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './../styles/main.css';
import Main from './../components/Main'
import Company from './../components/Company';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'


function App() {
    return (<div>
        {this.props.children}
    </div>)
}

function appRouter(){
    return (
        <Router>
            <Route path='/view' exact component={Main}/>
            <Route path='/company/:company_name' component={Company}/>
        </Router>
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
