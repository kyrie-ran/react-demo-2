import React, { Component } from 'react';
import store from '../store';

export default class ReduxPage extends Component {
    componentDidMount(){
        store.subscribe(() => {
            this.forceUpdate()
        })
    }
    add = () => {
        store.dispatch({type: "ADD",payload: 100});
    }
    render() {
        return (
            <div>
                <p>ReduxPage</p>
                <div>{store.getState()}</div>
                <button onClick={this.add}>add</button>
            </div>
        )
    }
}
