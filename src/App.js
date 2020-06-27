import React, { Component } from 'react';
import './App.css';
import Nav from './nav/Nav';
import SignedOut from './signedOut/SignedOut';
import SignIn from './signIn/SignIn';
import Home from './home/Home';
import PasswordReset from './passwordReset/PasswordReset';
import SuccessfullyReset from './passwordReset/SuccessfullyReset';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  
  state = {
    isLoggedIn: false,
    accessToken: "",
    idToken: "",
    refreshToken: ""
  }
  
  signoutHandler = () => {
    this.setState({isLoggedIn: false, accessToken: "", refreshToken: ""})
    console.log(this.state);
  }

  signinHandler = (accessToken, refreshToken, idToken) => {
    this.setState({isLoggedIn: true, accessToken: accessToken, refreshToken: refreshToken, idToken: idToken});
  }

  render() {

    return (
      <BrowserRouter>
        <div className="App">
            
            <Nav authStatus={this.state.isLoggedIn}
              signoutHandler={this.signoutHandler}
            />
            <Route exact path='/signedOut' component={SignedOut} />
            <Route exact path='/successfullyreset' component={SuccessfullyReset} />
            <Route exact path='/signIn' render={(props)=>(
              <SignIn {...props} signinHandler={this.signinHandler} />
              )}
            />
            <Route exact path='/' render={(props)=>(
              <Home {...props} rootstate={this.state} />
              )}
            />
            <Route exact path='/passwordreset' component={PasswordReset} />
            {/* <Route exact path='/' component={Robosearch} />
            <Route exact path='/about' component={About} />
            <Route exact path='/signin' component={Signin} /> */}
        </div>
      </BrowserRouter> 


    );
  }
}

export default App;
