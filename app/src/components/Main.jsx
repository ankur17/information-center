import React, {Component} from 'react';
import {PseudoTable} from './common/PesudoTable'
import 'whatwg-fetch'

class Main extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            isDataAvailable : false,
            userData : {}
        }
    }

    componentWillMount(){
        let url = '/ajax/user_info';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }).then(result=>{
            console.log("RESULT",result);
            this.setState({
                userdata: result,
                isDataAvailable: true
            })
        })
    }

    render()
    {
        return (
            <div>
                <div className="userContainer">
                    <div className="nameHeading">
                        <p>User Deatils</p>
                    </div>

                    {this.state.isDataAvailable? <MicroComponent/> : <h6>Loading..</h6>}


                </div>

            </div>
        )
    }
}


function MicroComponent(props) {
    return (<div>
        <PseudoTable left="Name" right={"ankur"} />
        <PseudoTable left="Name" right={"ankur"} />
        <PseudoTable left="Name" right={"ankur"} />
        <PseudoTable left="Name" right={"ankur"} />
        <PseudoTable left="Name" right={"ankur"} />

    </div>)
}


export default Main ;