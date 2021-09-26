import { createStore, applyMiddleware ,combineReducers} from 'redux';
import thunk from "redux-thunk"; // 异步解决方案
import logger from "redux-logger"; // 打印日志
import promise from "redux-promise"; // 处理promise

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