import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'; 
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'; 

const poolData = {
    UserPoolId : "us-east-1_23Z2YmLff",
    ClientId: "3u5o6b63ptgu99or0ra6q93kfb"
}

const UserPool = new CognitoUserPool(poolData);

class PasswordReset extends Component {

    state = {
        username : "",
        password : "",
        newpassword : "",
        loginFailure: false,
        redirect: false
    }

    usernameHandler = (usernameInput) => {
        this.setState({username : usernameInput.target.value});
    }

    passwordHandler = (passwordInput) => {
        this.setState({password : passwordInput.target.value});
    }

    newPasswordHandler = (passwordInput) => {
        this.setState({newpassword : passwordInput.target.value});
    }

    submitHandler = (e) => {
        e.preventDefault();
        console.log("ro submit handler");
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
                this.props.signinHandler(data.accessToken.jwtToken, data.refreshToken.token);
                this.setState({redirect: true});

            },
            onFailure: (err) => {
                console.log("err", err);
                this.setState({loginFailure: true});
            },
            newPasswordRequired: (data) => {
                delete data.email_verified;
                user.completeNewPasswordChallenge(this.state.newpassword, data,{
                    onSuccess: (result) => {
                        console.log(result);
                        this.setState({redirect: true})
                      },
                    onFailure: (err) => {
                    console.log(err);
                    }
                });
            },
        });

    }


    render () {
        return(
            this.state.redirect
            ? <Redirect to="/successfullyreset" />
            :
            <main className="pa4 white">
                <form className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">New Password Required</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                        <input className="white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="username"  id="username" onChange={(e) => this.usernameHandler(e)}/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Old Password</label>
                        <input className="white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={(e) => this.passwordHandler(e)}/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="newPassword">New Password</label>
                        <input className="white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="newPassword"  id="newPassword" onChange={(e) => this.newPasswordHandler(e)}/>
                    </div>
                    </fieldset>
                    <div className="">
                    <input className="b ph3 pv2 input-reset ba white bg-transparent grow pointer f6 dib" type="submit" value="Set new password" onClick={(e)=>this.submitHandler(e)} />
                    {
                        this.state.loginFailure?
                        <h4>Unauthorized. Old password is incorrect, please try again..</h4>:
                        <h4> </h4>
                    }
                    </div>
                </form>
            </main>
        )
    }
}


export default PasswordReset;