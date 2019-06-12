import React, {Component} from 'react';


function PseudoTable(props){
    return (<div className="pesudoRow">
        <div className="left">
            <p>{props.left}</p>
        </div>

        <div className="right">
            <p>{props.right}</p>
        </div>
    </div>)
}


export { PseudoTable };