import React, {Component} from 'react';
import {PseudoTable} from './common/PesudoTable'
import {setup, emit, receiveData} from './../helper/socket_client'
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
        // socket connection
        setup()
        receiveData((data)=>this.setState({
            live_views : data
        }))

        this.fetchData = this.fetchData.bind(this)
        this.onUnload = this.onUnload.bind(this);
        this.postForPageView = this.postForPageView.bind(this);
        this.messageEmitter = this.messageEmitter.bind(this);
    }

    onUnload(e) {
        const confirmationMessage = '';
        this.messageEmitter("DECREMENT");
        e.preventDefault();
        e.returnValue = '';

    }

    messageEmitter(action){
        emit({
            action_type : action,
            company_name : this.props.match.params.company_name,
            id : USER.id
        })
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
        this.postForPageView()
        this.fetchData()
    }

    componentDidMount(){

        window.addEventListener('unload', this.onUnload,false);
        this.messageEmitter("INCREMENT")

    }


    componentWillUnmount(){
        window.removeEventListener("unload", this.onUnload,false)
    }



    render(){
        let renderComponent = null;
        if (this.state.isDataAvailable)
            renderComponent = <MicroComponent companyData={this.state.companyData} live_views={this.state.live_views} />
        else
            renderComponent = <h3>Loading..</h3>
        return (
            <div>
                <div className="userContainer companyContainer">
                    <div className="nameHeading">
                        <p>Company Details</p>
                        <Link to="/view"><button onClick={()=>this.messageEmitter("DECREMENT")}>Go Back</button></Link>
                    </div>

                    {renderComponent}

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