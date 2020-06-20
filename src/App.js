import React, { Component } from 'react';
import './App.css';
import Nav from './nav/Nav';
import SignedOut from './signedOut/SignedOut';
import SignIn from './signIn/SignIn';

import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  
  state = {
    isLoggedIn: false,
  }
  
  signoutHandler = () => {
    this.setState({isLoggedIn: false})
    console.log(this.state);
  }

  signinHandler = (accessToken) => {
    this.setState({isLoggedIn: true, accessToken: accessToken})
  }

  render() {

    return (
      <BrowserRouter>
        <div className="App">
            
            <Nav authStatus={this.state.isLoggedIn}
              signoutHandler={this.signoutHandler}
            />
            <Route exact path='/signedOut' component={SignedOut} />
            {/* <Route exact path='/signIn' component={SignIn} /> */}
            <Route exact path='/signIn' render={(props)=>(
              <SignIn {...props} signinHandler={this.signinHandler} />
              )}
            />
            {/* <Route exact path='/' component={Robosearch} />
            <Route exact path='/about' component={About} />
            <Route exact path='/signin' component={Signin} /> */}
        </div>
      </BrowserRouter> 


    );
  }
}

export default App;
