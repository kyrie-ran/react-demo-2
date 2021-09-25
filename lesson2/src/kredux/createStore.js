export default function createStore(reducer,enhancer) {
    if(enhancer){
        // enhancer 是用于加强store.dispatch的
        return enhancer(createStore)(reducer);
    }
    // store state
    let currentState;
    // 监听函数数组
    let currentListeners = [];
    // 获取状态
    function getState() {
        return currentState;
    }
    // 修改状态
    function dispatch(action) {
        currentState = reducer(currentState,action);
        currentListeners.forEach(listener => listener());
    }
    function subscribe(listener) {
        currentListeners.push(listener);
        return () => {
            currentListeners = [];
        }
    }

    // 设置默认值
    dispatch({type:'REDUX/xxxxxxxxxxxxx'});

    return {
        getState,
        dispatch,
        subscribe
    };
}
