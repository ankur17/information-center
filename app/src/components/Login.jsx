import React, {Component} from 'react';
import 'whatwg-fetch'
import avatar from './../images/img_avatar.png';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password : "",
            showWarning : false
        }
        this.verify = this.verify.bind(this)
        this.passwordChanged = this.passwordChanged.bind(this)
        this.usernameChanged = this.usernameChanged.bind(this)

    }


    verify(){
        let url = '/auth/check';
        // let url = '/ajax/authcheck';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        }).then(result=>{

            if( (result.status == 200) && result.ok ){
                window.location.href = "/view"
            } else {
                this.setState({
                    username : "",
                    showWarning : true
                })
            }
        })
    }

    usernameChanged(event){
        this.setState({
            username : event.target.value,
            showWarning : false
        })
    }

    passwordChanged(event){
        this.setState({
            password : event.target.value,
            showWarning : false
        })
    }


    render() {
        return (
            <div key="login_form" className="login_form">
                <h2>Information Center Login</h2>
                <div className="formcontainer">
                    <div className="imgcontainer">
                        <img src={avatar} alt="Avatar" className="avatar"/>
                    </div>

                    {(this.state.showWarning) ? <p>Username or password is incorrect</p> : null }

                    <div className="container">
                        <label><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" value={this.state.username} onChange={this.usernameChanged}/>

                        <label><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" value={this.state.password} onChange={this.passwordChanged}/>

                        <button onClick={this.verify}>Login</button>
                    </div>

                </div>

            </div>
        )
    }
}

export default Login;