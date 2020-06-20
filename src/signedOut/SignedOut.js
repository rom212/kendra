import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class SignedOut extends Component {

    state = {
        redirect : false,
    }

    componentDidMount() {
        setTimeout(() => this.setState({ redirect: true }), 4000)
      }

    render () {
        return (
            
            this.state.redirect
            ? <Redirect to="/" />
            : <div className="white dib mr3 tc w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
            You've been sucessfully signed out. You will be redirected to the home page..
            </div>
        )
    }
}


export default SignedOut;