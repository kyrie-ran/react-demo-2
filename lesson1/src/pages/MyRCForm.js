import React, { Component } from 'react';
import Input from '../components/Input';
import createForm from '../components/my-rc-form';

@createForm
class MyRCForm extends Component {
    submit = () => {
        const { getFieldValue } = this.props.form;
        console.log('submit', getFieldValue());
    }
    componentDidMount(){
        this.props.form.setFieldValue({username:'default'})
    }
    render() {
        console.log('props', this.props);
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <h3>MyRCForm</h3>
                {getFieldDecorator('username')(<Input placeholder="Username" />)}
                {getFieldDecorator('password')(<Input placeholder="Password" />)}
                <button onClick={this.submit}>submit</button>
            </div>
        )
    }
}
export default MyRCForm;