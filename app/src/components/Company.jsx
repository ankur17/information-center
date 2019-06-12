import React, {Component} from 'react';
import {PseudoTable} from './common/PesudoTable'
import {setup, emit, liveViewsCount, receiveData} from './../helper/socket_client'
import { Link } from 'react-router-dom';
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

        this.company_name = this.props.match.params.company_name
        this.fetchData = this.fetchData.bind(this)
    }

    postForPageView(){
        let path = "/ajax/addcompany_count"
        let date = Date.now()
        fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                company_name : this.props.match.params.company_name,
                timestamp : date
            }),
            credentials: "include"
        })
    }

    fetchData(){
        let url = '/ajax/company_info';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                company_name : this.props.match.params.company_name
            })
        }).then(res=>{
            return res.json();
        }).then(result=>{
            this.setState({
                companyData: result.data,
                isDataAvailable: true
            })
        })
    }


    componentWillMount(){

        function WindowCloseHanlder(){
            window.alert('My Window is reloading');
        }
        window.onbeforeunload = WindowCloseHanlder;

        this.postForPageView()
        this.fetchData()
    }

    handleWindowClose(){
        alert("Alerted Browser Close");
    }

    componentDidMount(){
        window.addEventListener('onbeforeunload', this.handleWindowClose);
        emit({
            action_type : "INCREMENT",
            company_name : this.company_name,
            id : USER.id
        })
    }


    componentWillUnmount(){
        window.removeEventListener('onbeforeunload', this.handleWindowClose);
        emit({
            action_type : "DECREMENT",
            company_name : this.company_name,
            id : USER.id
        })
    }



    render(){
        return (
            <div>
                <div className="userContainer companyContainer">
                    <div className="nameHeading">
                        <p>Company Details</p>
                        <Link to="/view"><button>Go Back</button></Link>
                    </div>

                    {this.state.isDataAvailable? <MicroComponent companyData={this.state.companyData} live_views={this.state.live_views} /> : <h6>Loading..</h6>}

                </div>
            </div>
        )
    }
}


function MicroComponent(props) {

    let companyData= props.companyData;
    return (<div>
        <div className="userImgContainer">
            <img src={companyData.image} alt="Avatar" className="userImage"/>
        </div>
        <PseudoTable left="Name" right={companyData["name"]} />
        <PseudoTable left="Founded In" right={companyData["founded_in"]} />
        <PseudoTable left="Introduction" right={companyData["intro"]} />
        <PseudoTable left="Address" right={companyData["address"]} />
        <PseudoTable left="Email" right={companyData["email"]} />
        <PseudoTable left="Page View" right={companyData["page_views"]} />
        <PseudoTable left="Live View" right={props.live_views} />

    </div>)
}


export default Company;