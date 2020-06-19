import React, { Component } from 'react';
import './App.css';
import Nav from './nav/Nav';

import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  
  state = {
    isLoggedIn: true,
  }
  
  render() {

    return (
      <BrowserRouter>
        <div className="App">
            
            <Nav authStatus={this.state.isLoggedIn} />
            <h1 className="white dib">TEST RO</h1>
            <h2> Please log in</h2>
            {/* <Route exact path='/' component={Robosearch} />
            <Route exact path='/about' component={About} />
            <Route exact path='/signin' component={Signin} /> */}
        </div>
      </BrowserRouter> 


    );
  }
}

export default App;
