import React, { Component } from 'react';
import Dialog from '../components/Dialog';

export default class DialogPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        }
    }

    render() {
        const { show } = this.state;
        return (
            <>
                <button onClick={() => { this.setState({ show: !show }) }}>toggle</button>
                {show && <Dialog />}
            </>
        )
    }
}
