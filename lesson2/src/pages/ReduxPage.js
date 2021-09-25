import React, { Component } from 'react';
import store from '../store';

export default class ReduxPage extends Component {
    componentDidMount(){
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate()
        })
    }
    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe();
    }
    
    add = () => {
        store.dispatch({type: "ADD",payload: 100});
    }

    asyAdd = () => {
        store.dispatch((dispatch,getState) => {
            console.log('getState',getState());
            setTimeout(() => {
                dispatch({type:'ADD'})
            },1000)
        })
    }

    promiseMinus = () => {
        store.dispatch(
            Promise.resolve({
                type: "MINUS",
                payload: 100
            })
        )
    }

    render() {
        return (
            <div>
                <p>ReduxPage</p>
                {/* <div>{store.getState()}</div> */}
                <div>{store.getState().count}</div>
                <button onClick={this.add}>add</button>
                <button onClick={this.asyAdd}>asyAdd</button>
                <button onClick={this.promiseMinus}>promiseMinus</button>
            </div>
        )
    }
}
