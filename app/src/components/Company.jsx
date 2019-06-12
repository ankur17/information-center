import React, {Component} from 'react';
import {PseudoTable} from './common/PesudoTable'
import {setup, emit, liveViewsCount, receiveData} from './../helper/socket_client'
// yaha pe socket add krna hai...
// add back button
class Company extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companyData : {},
            isDataAvailable : false,
            live_views : 0
        }
        setup()
        receiveData((data)=>this.setState({
            live_views : data
        }))
    }


    componentWillMount(){

        function WindowCloseHanlder(){
            window.alert('My Window is reloading');
        }
        window.onbeforeunload = WindowCloseHanlder;

        let url = '/ajax/company_info';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                company_name : 'inshorts'
            })
        }).then(result=>{
            console.log("RESULT",result);
            this.setState({
                userdata: result,
                isDataAvailable: true
            })
        })
    }

    handleWindowClose(){
        alert("Alerted Browser Close");
    }

    componentDidMount(){
        window.addEventListener('onbeforeunload', this.handleWindowClose);
        emit({
            action_type : "INCREMENT",
            company_name : "inshorts"
        })
    }


    componentWillUnmount(){
        window.removeEventListener('onbeforeunload', this.handleWindowClose);
        emit({
            action_type : "DECREMENT",
            company_name : "inshorts"
        })
    }



    render(){
        return (
            <div>
                <div className="userContainer companyContainer">
                    <div className="nameHeading">
                        <p>Company Detailsss</p>
                    </div>

                    <p>Live View: {this.state.live_views} </p>

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