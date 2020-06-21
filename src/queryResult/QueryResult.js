import React, {Component} from 'react';

class QueryResult extends Component {

    state = {
        result : ""
    }
    
    componentDidUpdate = (prevProps) => {
        // Typical usage (don't forget to compare props):
        if (this.props.input !== prevProps.input) {
            console.log(`https://jsonplaceholder.typicode.com/posts/${this.props.input}`);
            fetch(`https://jsonplaceholder.typicode.com/posts/${this.props.input}`)
            .then(response=>response.json())
            .then(data=>this.setState({result:data.body}))
        }
      }

    render () {
        return (
            <div>
                <main className="pa4 white measure center">
                    <h4>
                        {this.state.result}
                    </h4>
                </main>
            </div>
        )
    }
}


export default QueryResult;