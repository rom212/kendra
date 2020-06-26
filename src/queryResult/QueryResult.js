import React, {Component} from 'react';

class QueryResult extends Component {

    state = {
        result : ""
    }
    
    componentDidUpdate = (prevProps) => {
        if (this.props.input !== prevProps.input) {
            // fetch(`https://jsonplaceholder.typicode.com/posts/${this.props.input}`)
            fetch(`https://nmxnk8j7ka.execute-api.us-east-1.amazonaws.com/dev/kendraquery?query=${encodeURIComponent(this.props.input)}`)
            .then(response=>response.json())
            .then(data=>this.setState({result:data.result}))
            .catch(err=> console.log(err))
        }
      }

    render () {
        console.log(this.props.accessToken);
        return (
            <div>
                <main className="pa4 white measure-wide center">
                    <h4>
                        {this.state.result}
                    </h4>
                </main>
            </div>
        )
    }
}


export default QueryResult;