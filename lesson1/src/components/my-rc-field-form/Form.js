import React, { useImperativeHandle } from 'react'
import FieldContext from './FieldContext';
import useForm from './useForm'

export default function From({ children, onFinish, onFinishFailed, form }, ref) {
    const [formInstance] = useForm(form);

    useImperativeHandle(ref,() => formInstance)

    formInstance.setCallback({
        onFinish,
        onFinishFailed
    })
    return (
        <form onSubmit={e => {
            e.preventDefault()
            formInstance.submit()
        }
        }>
            <FieldContext.Provider value={formInstance}>
                {children}
            </FieldContext.Provider>
        </form>
    )
}
