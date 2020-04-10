import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Card, List } from 'antd';
import { TODO_ADD_REQUEST, TODO_DATA_REQUEST, TODO_DELETE_REQUEST } from '../reducers/todo';
import AppLayout from '../components/AppLayout';

const Main = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const { todo } = useSelector(state => state.todo)

    useEffect(() => {
        dispatch({
            type: TODO_DATA_REQUEST
        })
        setValue('')
    },[todo.length])

    const onChangeValue = useCallback((e) => {
        setValue(e.target.value)
    }, [])

    const onClickAdd = useCallback((e) => {
            dispatch({
                type: TODO_ADD_REQUEST,
                data: value
            })
    }, [value])

    const onClickDelete = useCallback((item) => () => {
        dispatch({
            type: TODO_DELETE_REQUEST,
            id: item.id,
            data: item.data
        })
    }, [])

    return (
        <AppLayout>
            <Card title='TODO'>
                <List
                    size="large"
                    bordered
                    dataSource={todo}
                    renderItem={(item, i) => (
                        <List.Item actions={[<Button key={`todo_Delete_${i}`} onClick={onClickDelete(item)}>삭제</Button>]}>
                            {item.data}
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
