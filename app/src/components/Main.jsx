import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {PseudoTable} from './common/PesudoTable'
import 'whatwg-fetch'

class Main extends Component {
    constructor(props) {
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
        }).then(res=>{
            return res.json();
        }).then(result=>{
            let data = result.data;
            this.setState({
                userData: result.data,
                isDataAvailable: true
            })
        });

    }

    render()
    {
        return (
            <div key="main_container">
                <div className="userContainer">
                    <div className="nameHeading">
                        <p>User Details</p>
                    </div>
                    <div className="horizontalLine"/>

                    {this.state.isDataAvailable? <MicroComponent userData={this.state.userData}/> : <h3>Loading..</h3>}


                </div>

            </div>
        )
    }
}


function MicroComponent(props) {

    let userData = props.userData;
    let company_url = `/company/${userData["company"]}`
    return (<div>
        <div className="userImgContainer">
            <img src={userData.image} alt="Avatar" className="userImage"/>
        </div>
        <PseudoTable left="Name" right={userData["name"]} />
        <PseudoTable left="NickName" right={userData["nickname"]} />
        <PseudoTable left="Gender" right={userData["gender"]} />
        <PseudoTable left="Age" right={userData["age"]} />
        <PseudoTable left="User Name" right={userData["username"]} />
        <div className="pesudoRow">
            <div className="left">
                <p>Company Name</p>
            </div>

            <div className="right">
                <Link to={company_url}><p>{userData["company"]}</p></Link>
            </div>
        </div>
        <PseudoTable left="Job Role" right={userData["job_role"]} />

    </div>)
}


export default Main ;