import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ReduxHookPage() {
    const count = useSelector(({ count }) => count);

    const dispatch = useDispatch();
    const add = useCallback(() => {
        dispatch({ type: "ADD" });
    }, [dispatch]);
    return (
        <div>
            <p>{count}</p>
            <button onClick={add}>add</button>
        </div>
    )
}
