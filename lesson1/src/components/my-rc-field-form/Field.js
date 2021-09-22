import React, { Component } from 'react';
import FieldContext from './FieldContext';

export default class Field extends Component {
    static contextType = FieldContext;

    onStoreChange = () => {
        this.forceUpdate();
    }

    componentDidMount(){
        this.unregisterEntity = this.context.registerEntity(this);
    }
    componentWillUnmount(){ // 组件卸载取消更新
        if(this.unregisterEntity){
            this.unregisterEntity();
        }
    }

    getControlled = () => {
        const { getFieldValue, setFieldsValue } = this.context;
        const { name } = this.props;
        return {
            value: getFieldValue(name),
            onChange: e => {
                const newValue = e.target.value;
                setFieldsValue({ [name]: newValue })
                console.log("newValue", newValue);
            }
        }
    }
    render() {
        const { children } = this.props;
        return React.cloneElement(children, this.getControlled());
    }
}
