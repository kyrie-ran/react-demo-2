import { useRef } from 'react';
// 存储Form的数据
class FormStore {
    constructor() {
        // 这里存储Form要处理的数据
        this.store = {};
        this.fieldEntities = {};//[];
        this.callbacks = {};
    }

    setCallback = callback => {
        this.callbacks = {
            ...this.callbacks,
            ...callback
        }
    }
    
    registerEntity = entity => {
        // this.fieldEntities.push(entity);
        this.fieldEntities = {
            ...this.fieldEntities,
            [entity.props.name]: entity
        }
        // 取消卸载组件的注册
        return () => {
            delete this.fieldEntities[entity.props.name];
        }
    }

    getFieldValue = name => {
        const v = this.store[name];
        return v;
    }
    setFieldsValue = newStore => {
        // 修改state数据
        this.store = {
            ...this.store,
            ...newStore
        }
        // 更新组件
        Object.keys(newStore).forEach(name => {
            this.fieldEntities[name].onStoreChange();
        })
    }

    validate = () => {
        let err = [];
        Object.keys(this.fieldEntities).forEach(key => {
            const entity = this.fieldEntities[key];
            const {rules} = entity.props;
            const rule = rules && rules[0];
            const value = this.getFieldValue(key);
            if(rule && rule.required && value === undefined){
                err.push({
                    [key]: rule.message,
                    value
                })
            }
        })
        return err;
    }
    
    submit = () => {
        const {onFinish, onFinishFailed} = this.callbacks;
        let err = this.validate();
        if(err.length === 0){
            onFinish && onFinish({...this.store});
        }else{
            onFinishFailed && onFinishFailed(err,{...this.store});
        }
    }

    getForm = () => {
        return {
            getFieldValue: this.getFieldValue,
            setFieldsValue: this.setFieldsValue,
            registerEntity: this.registerEntity,
            submit: this.submit,
            setCallback: this.setCallback
        }
    }
}

export default function useForm(form) {
    const formRef = useRef();
    if (!formRef.current) {
        if(form){
            formRef.current = form;
        }else{
            const formStore = new FormStore();
            formRef.current = formStore.getForm();
        }
    }
    return [formRef.current];
}