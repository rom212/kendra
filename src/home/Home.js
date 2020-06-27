import React, {Component} from 'react';
import QueryResult from '../queryResult/QueryResult';

class Home extends Component {
    
    state = {
        query : "",
        queryInput : ""
    }

    queryHandler = (queryInput) => {
        this.setState({query : queryInput.target.value});
    }
    
    submitHandler = (e) => {
        e.preventDefault();
        this.setState({queryInput : this.state.query});
    }

    render() {
        console.log("rendering");
        console.log(this.props.rootstate.isLoggedIn);
        return (
            <div>
                <main className="pa4 white">
                    <form className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        {
                            this.props.rootstate.isLoggedIn?
                            <legend className="tc f4 fw6 ph0 mh0">Enter your query</legend>:
                            <legend className="tc f4 fw6 ph0 mh0">Please sign in first</legend>
                        }
                        {/* <legend className="tc f4 fw6 ph0 mh0">Enter your query</legend> */}
                        <div className="mt3">
                            {/* <label className="db fw6 lh-copy f6" htmlFor="username">Username</label> */}
                        {
                            this.props.rootstate.isLoggedIn?
                            <input className="white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="query"  id="query" onChange={(e) => {this.queryHandler(e)}}/>:
                            <input disabled="disabled" className="white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 o-50" type="text" name="query"  id="query"/>
                        }
                            
                        </div>
                        </fieldset>
                        <div className="">
                        {
                            this.props.rootstate.isLoggedIn?
                            <input className="b ph3 pv2 input-reset ba white bg-transparent grow pointer f6 dib" type="submit" value="Submit" onClick={(e) => {this.submitHandler(e)}} />:
                            <input disabled="disabled" className="b ph3 pv2 input-reset ba white bg-transparent pointer f6 dib o-50" type="submit" value="Submit" />

                        }
                        </div>
                    </form>
                </main>
                <QueryResult input={this.state.queryInput} idToken={this.props.rootstate.idToken}/>
            </div>
        )
    }
}

export default Home;