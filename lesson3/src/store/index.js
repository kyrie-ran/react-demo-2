// import { createStore, applyMiddleware ,combineReducers} from 'redux';
import { createStore, applyMiddleware, combineReducers } from '../kredux';
// import thunk from "redux-thunk"; // 异步解决方案
// import logger from "redux-logger"; // 打印日志
// import promise from "redux-promise"; // 处理promise
import isPromise from "is-promise"; // 检查是不是promise
import { isFSA } from "flux-standard-action"; // 检查是不是标准的action模式

export const counterReducer = (state = 0, { type, payload = 1 }) => {
    switch (type) {
        case "ADD":
            return state + payload;
        case "MINUS":
            return state - payload;
        default:
            return state;
    }
}

export const counterReducer2 = (state = { num: 0 }, { type, payload }) => {
    switch (type) {
        case "ADD2":
            return { ...state, num: state.num + payload };
        default:
            return state;
    }
}

// logger 要作为 applyMiddleware 的最后一个参数，不然不能保证action是plain object;
const store = createStore(
    // counterReducer,
    combineReducers({
        count: counterReducer,
        count2: counterReducer2
    }),
    applyMiddleware(promise, thunk, logger)
);

export default store;

function logger({ dispatch, getState }) {
    return next => action => {
        console.log('++++++++++++++');
        console.log(action.type + '执行了~');
        const prevState = getState();
        console.log("prev state", prevState);

        const returnValue = next(action);

        const nextState = getState();
        console.log("next state", nextState);


        console.log('++++++++++++++');

        return returnValue;
    }
}

function thunk({ dispatch, getState }) {
    return next => action => {
        // action 类型  对象 | 函数
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }
        return next(action)
    }
}

// 简版
// function promise({ dispatch }) {
//     return next => action => {
//         return isPromise(action) ? action.then(dispatch) : next(action);
//     }
// }

// 完整版
function promise({ dispatch }) {
    return next => action => {
        if (!isFSA(action)) {
            return isPromise(action) ? action.then(dispatch) : next(action);
        }
        return isPromise(action.payload) ?
            action.payload
                .then(result => dispatch({ ...action, payload: result }))
                .catch(error => {
                    dispatch({ ...action, payload: error, error: true });
                    return Promise.reject(error);
                })
            : next(action);
    }
}
