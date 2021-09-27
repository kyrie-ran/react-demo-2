import React, { useReducer } from 'react';
import { counterReducer } from '../store';

const initArg = init => init - 0;

export default function HooksPage() {
    // 代替 useState 处理复杂/复用 逻辑
    const [state, dispatch] = useReducer(counterReducer, "0", initArg); // 第三个参数可以用来处理默认值
    return (
        <div>
            <button onClick={() => dispatch({ type: "ADD" })}>{state}</button>
        </div>
    )
}

