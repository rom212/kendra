import React, {Component} from 'react';

class Home extends Component {
    
    render() {
        console.log("rendering");
        return (
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
                                <input className="white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="query"  id="query"/>:
                                <input disabled="disabled" className="white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="query"  id="query"/>
                            }
                                
                            </div>
                            </fieldset>
                            <div className="">
                            {
                                this.props.rootstate.isLoggedIn?
                                <input className="b ph3 pv2 input-reset ba white bg-transparent grow pointer f6 dib" type="submit" value="Submit" />:
                                <input disabled="disabled" className="b ph3 pv2 input-reset ba white bg-transparent pointer f6 dib o-50" type="submit" value="Submit" />

                            }
                            </div>
                        </form>
                    </main>
        )
    }
}

export default Home;