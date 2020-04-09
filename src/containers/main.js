import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input } from 'antd';
import { TODO_ADD_REQUEST } from '../reducers/todo';

const Main = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch();

    const onChangeValue = useCallback((e) => {
        setValue(e.target.value)
    }, [])

    const onClick = useCallback((e) => {
        console.log(value)
        dispatch({
            type: TODO_ADD_REQUEST,
            data: value
        })
    }, [value])
    return (
        <>
            <Input value={value} onChange={onChangeValue}/>
            <Button onClick={onClick}>ddd</Button>
        </>
    )
}

export default Main;
