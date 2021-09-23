// import React, { Component } from 'react';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

// export default class Dialog extends Component {
//     constructor(props) {
//         super(props)
//         this.node = document.createElement('div');
//         document.body.appendChild(this.node);
//     }
//     componentWillUnmount(){
//         this.node && document.body.removeChild(this.node);
//     }
//     render() {
//         return createPortal(
//             <div className="dialog">
//                 Dialog
//             </div>,
//             this.node
//         )
//     }
// }
export default function Dialog() {
    let node = document.createElement('div');
    useEffect(() => {
        document.body.appendChild(node);
        return () => node && document.body.removeChild(node);
    },[node])
    return createPortal(
        <div className="dialog">
            Dialog
        </div>,
        node
    )
}