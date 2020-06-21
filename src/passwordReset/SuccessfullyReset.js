import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class SuccessfullyReset extends Component {

    state = {
        redirect : false,
    }

    componentDidMount() {
        setTimeout(() => this.setState({ redirect: true }), 3000)
      }

    render () {
        return (
            this.state.redirect
            ? <Redirect to="/signin" />
            : <div className="white dib mr3 tc w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
            You've sucessfully set a new password. You will be redirected to the sign in page..
            </div>
        )
    }
}


export default SuccessfullyReset;