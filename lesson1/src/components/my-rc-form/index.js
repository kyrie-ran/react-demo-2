import React, { Component, cloneElement } from 'react';

export default function createForm(Cmp) {
    return class extends Component {
        constructor(props) {
            super(props)
        
            this.state = {
                 
            }
        }
        handleChange = e => {
            const {value,name} = e.target;
            this.setState({
                [name]: value
            })
        }

        getFieldDecorator = (field) => InputCmp => cloneElement(InputCmp, {
            name: field,
            value: this.state[field] || '',
            onChange: this.handleChange
        })

        setFieldValue = (newStore) => this.setState(newStore);

        getFieldValue = () => this.state;

        getForm = () => {
            return {
                form: {
                    getFieldDecorator: this.getFieldDecorator,
                    setFieldValue: this.setFieldValue,
                    getFieldValue: this.getFieldValue
                }
            }
        }
        render() {
            return <Cmp {...this.props} {...this.getForm()} />
        }
    }
}
