import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { bindActionCreators } from '../kReactRedux';
@connect(
    ({count,count2}) => ({count,count2}),
    dispatch => {
        let creators = {
            add: () => ({type: "ADD"}),
            minus: () => ({type: "MINUS"}),
            add2: () => ({type: "ADD2",payload: 10})
        }
        creators = bindActionCreators(creators,dispatch);
        return {
            dispatch,
            ...creators
        }
    },
    (stateProps,dispatchProps,ownProps) => ({...stateProps,...dispatchProps,...ownProps})
)
class ReduxPage extends Component {
    asyAdd = () => {
        this.props.dispatch((dispatch,getState) => {
            console.log('getState',getState());
            setTimeout(() => {
                dispatch({type:'ADD'})
            },1000)
        })
    }

    promiseMinus = () => {
        this.props.dispatch(
            Promise.resolve({
                type: "MINUS",
                payload: 100
            })
        )
    }

    add2 = () => {
        this.props.dispatch({type: "ADD2",payload: 100})
    }

    render() {
        const {count,count2,add,minus,add2} = this.props;
        console.log(this.props);
        return (
            <div>
                <p>ReduxPage</p>
                <div>count: {count}</div>
                <div>count2: {count2?.num}</div>
                <button onClick={add}>add</button>
                <button onClick={minus}>minus</button>
                <button onClick={this.asyAdd}>asyAdd</button>
                <button onClick={this.promiseMinus}>promiseMinus</button>

                <button onClick={add2}>count2 add2</button>
            </div>
        )
    }
}

export default ReduxPage;