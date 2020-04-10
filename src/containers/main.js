import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Card, List } from 'antd';
import { TODO_ADD_REQUEST, TODO_DATA_REQUEST, TODO_DELETE_REQUEST, TODO_UPDATE_REQUEST  } from '../reducers/todo';
import AppLayout from '../components/AppLayout';

const Main = () => {
    const [value, setValue] = useState('')
    const [updateValue, setUpdateValue] = useState('')
    const dispatch = useDispatch()
    const { todo } = useSelector(state => state.todo)
    const [updateInputIndex, setUpdateInputIndex] = useState(null)
    const isMountChart = useRef(true);

    useEffect(() => {  //componentDidMount
        dispatch({
            type: TODO_DATA_REQUEST
        })
        
    },[])

    useEffect(() => { //componentDidUpdate
        if (isMountChart.current) {
            isMountChart.current = false;
        } else {
            setValue('')
        }
    }, [todo.length])

    const onChangeValue = useCallback((e) => {
        setValue(e.target.value)
    }, [])

    const onChangeUpdateValue = useCallback((e) => {
        setUpdateValue(e.target.value)
    }, [])

    const onClickAdd = useCallback((e) => {
            dispatch({
                type: TODO_ADD_REQUEST,
                data: value
            })
    }, [value])

    const onClickUpdate = useCallback((id, e) => (e) => {
        e.stopPropagation()
        setUpdateInputIndex(0)
        dispatch({
            type: TODO_UPDATE_REQUEST,
            data: updateValue,
            id
        })
    }, [updateValue])

    const onClickDelete = useCallback((item) => () => {
        dispatch({
            type: TODO_DELETE_REQUEST,
            id: item.id,
            data: item.data
        })
    }, [])

    const handleUpdateIndex = useCallback((index , e) => (e) => {
        e.stopPropagation()
            setUpdateInputIndex(index + 1)
    }, [updateInputIndex])

    return (
        <AppLayout>
            <Card title='TODO'>
                <List
                    size="large"
                    bordered
                    dataSource={todo}
                    renderItem={(item, i) => (
                        <List.Item actions={updateInputIndex && updateInputIndex === (i + 1) ? [] :[<Button key={`todo_Delete_${i}`} onClick={onClickDelete(item)}>삭제</Button>]} onClick={handleUpdateIndex(i)}>
                            {
                                updateInputIndex && updateInputIndex === (i + 1) ? (
                                    <>
                                        <Input value={updateValue} onChange={onChangeUpdateValue} onPressEnter={onClickUpdate(item.id)} size='large' style={{ width: '93.6%' }} />
                                        <Button onClick={onClickUpdate(item.id)} size='large'>수정</Button>
                                    </>
                                )
                                    : item.data
                            }
                        </List.Item>
                    )}
                />
                <br />
                <Input value={value} onChange={onChangeValue} onPressEnter={onClickAdd} style={{ width: '93.6%' }} size='large'/>
                <Button onClick={onClickAdd} size='large'>추가</Button>
            </Card>
        </AppLayout>
    )
}

export default Main;
