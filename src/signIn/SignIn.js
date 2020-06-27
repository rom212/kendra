import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'; 


const poolData = {
    UserPoolId : "us-east-1_23Z2YmLff",
    ClientId: "3u5o6b63ptgu99or0ra6q93kfb"
}

const UserPool = new CognitoUserPool(poolData);

class SignIn extends Component {

    state = {
        username : "",
        password : "",
        redirect: false,
        loginFailure: false,
        passwordReset: false,
        sessionAttr: ""
    }

    usernameHandler = (usernameInput) => {
        this.setState({username : usernameInput.target.value});
    }

    passwordHandler = (passwordInput) => {
        this.setState({password : passwordInput.target.value});
    }

    submitHandler = (e) => {
        e.preventDefault();
        const user = new CognitoUser({
            Username: this.state.username,
            Pool: UserPool,
        });
        
        const authDetails = new AuthenticationDetails({
            Username: this.state.username,
            Password: this.state.password
        })

        user.authenticateUser(authDetails, {
            onSuccess: (data) => {
                console.log("success", data);
                console.log(data.accessToken.jwtToken);
                this.props.signinHandler(data.accessToken.jwtToken, data.refreshToken.token, data.idToken.jwtToken);
                this.setState({redirect: true});

            },
            onFailure: (err) => {
                console.log("err", err);
                this.setState({loginFailure: true});
            },
            newPasswordRequired: (data) => {
                console.log("new password required", data);
                this.setState({sessionAttr: data, passwordReset: true});
            },
        });
    }


    render () {
        console.log("rendering");
        if (this.state.redirect) {
            return <Redirect to="/" />
        } else if (this.state.passwordReset) {
            return <Redirect to="/passwordreset"/>
        } else {
            return(
                <main className="pa4 white">
                    <form className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                            <input className="white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="username"  id="username" onChange={(e) => this.usernameHandler(e)}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={(e) => this.passwordHandler(e)}/>
                        </div>
                        </fieldset>
                        <div className="">
                        <input className="b ph3 pv2 input-reset ba white bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={(e)=>this.submitHandler(e)} />
                        {
                            this.state.loginFailure?
                            <h4>Unauthorized, please try signing in again..</h4>:
                            <h4> </h4>
                        }
                        </div>
                    </form>
                </main>
            )
        }
        
    }
}


export default SignIn;