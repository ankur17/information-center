import React, {Component} from 'react';
import 'whatwg-fetch'
import avatar from './../images/img_avatar.png';

console.log(avatar)
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            password : "",
            showWarning : false
        }
        this.callKaro = this.callKaro.bind(this)
        this.passwordChanged = this.passwordChanged.bind(this)
        this.usernameChanged = this.usernameChanged.bind(this)

    }


    callKaro(){
        let url = '/auth/check';
        // let url = '/ajax/authcheck';
        console.log("CLicked","callKaroji");
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
            console.log("RESULT",result);
            if( (result.status == 200) && result.ok ){
                window.location.href = "/view"
            } else {
                this.setState({
                    username : "",
                    password : "",
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
            <div key="login_form">
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

                        <button onClick={this.callKaro}>Login</button>
                    </div>

                </div>

            </div>
        )
    }
}

export default Login;