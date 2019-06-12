import React, {Component} from 'react';
import {PseudoTable} from './common/PesudoTable'
// yaha pe socket add krna hai...
// add back button
class Company extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyData : {},
            isDataAvailable : false
        }
    }


    componentWillMount(){
        let url = 'fgKJNjgsb';

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(result=>{
            console.log("RESULT",result);
            this.setState({
                userdata: result,
                isDataAvailable: true
            })
        })
    }

    render(){
        return (
            <div>
                <div className="userContainer companyContainer">
                    <div className="nameHeading">
                        <p>Company Details</p>
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


export default Company;