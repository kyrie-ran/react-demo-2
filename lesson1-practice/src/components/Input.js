import React from 'react'

const Input = props => <input {...props} />

export default function CustomizeInput(props) {
    const { value = "", ...otherProps } = props;
    return (
        <div style={{ padding: '8px' }}>
            <Input {...otherProps} value={value} />
        </div>
    )
}
