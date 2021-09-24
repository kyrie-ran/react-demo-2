// import React, { Component } from 'react';
import React, { useEffect } from 'react';
import Form, { Field } from '../components/my-rc-field-form';
import Input from '../components/Input';

export default function MyRcFieldForm (){
    const [form] = Form.useForm();
    useEffect(() => {
        console.log('form',form);
    }, [form])
    return (
        <div>
            <Form form={form}>
                <Field>
                    <Input placeholder="username" type="text" />
                </Field>
                <Field>
                    <Input placeholder="password" type="password" />
                </Field>
                <button>submit</button>
            </Form>
        </div>
    )
}


// export default class MyRcFieldForm extends Component {
//     render() {
//         return (
//             <div>
//                 <Form>
//                     <Field>
//                         <Input placeholder="username" type="text" />
//                     </Field>
//                     <Field>
//                         <Input placeholder="password" type="password" />
//                     </Field>
//                     <button>submit</button>
//                 </Form>
//             </div>
//         )
//     }
// }
