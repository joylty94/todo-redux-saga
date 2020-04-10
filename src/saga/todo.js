import { 
    all, 
    call,
    fork, 
    put, 
    takeEvery, 
    takeLatest, 
    throttle, 
    delay, 
} from 'redux-saga/effects';

// call, fork는 함수를 실행해준다.
// call은 동기호출  // 서버에 요청을 보내고 응답까지 완료 받음 // 순서대로
// fork는 비동기 호출  // 서버에 요청을 보내고 비동기식으로 다음 함수 실행  // 비동기식으로
// put saga의 dispatch
// all 제너레이터를 묶어줌
// takeEvery 액션이 dispatch 될 때 마다 실행
// takeLatest 액션이 여러번 dispatch 될 때 마지막 한번만 실행됨
// throttle 액션이 dispatch 된후, 지정된 시간만큼 멈춤. // yield throttle(2000, ADD_POST_REQUEST, addPost);

import * as firebase from 'firebase';
import { 
    TODO_DATA_REQUEST, TODO_DATA_SUCCESS, TODO_DATA_FAILURE,
    TODO_ADD_REQUEST, TODO_ADD_SUCCESS, TODO_ADD_FAILURE,
    TODO_DELETE_REQUEST, TODO_DELETE_SUCCESS, TODO_DELETE_FAILURE
} from '../reducers/todo'

async function fetchDataAPI () {
    //api 호출
    const snapshot = await firebase.database().ref('todo').once('value');
    const todoObj = snapshot.val();
    const todo = Object.entries(todoObj).map(([id, todoData]) => ({
        ...todoData,
        id,
    }));
    return todo;

}

function* fetchData(action) {
    try {
        const result = yield call(fetchDataAPI);
        yield put({
            type: TODO_DATA_SUCCESS,
            data: result
        })
    } catch (e) {
        console.log(e)
        yield put({
            type: TODO_DATA_FAILURE,
            error: e.response && e.response.data
        })
    }
}

function* watchfetchData() {
    yield takeLatest(TODO_DATA_REQUEST, fetchData)
}

async function todoAddAPI(textData) {
    //api 호출
    const result = await firebase
        .database()
        .ref('todo')
        .push({
            data: textData
        });

    return textData;
}

function* TodoAdd(action) {
    try {
        const result = yield call(todoAddAPI, action.data);
        yield put({
            type: TODO_ADD_SUCCESS,
            data: result
        })
    } catch (e) {
        console.log(e)
        yield put({
            type: TODO_ADD_FAILURE,
            error: e.response && e.response.data
        })
    }
}

function* watchTodoAdd() {
    yield takeLatest(TODO_ADD_REQUEST, TodoAdd)
}

/*
function* watchTodoAdd() {
    yield takeLatest(TODO_ADD_REQUEST, function*(action){
        try {
            const result = yield call(todoAddAPI, action.data);
            yield put({
                type: TODO_ADD_SUCCESS,
                data: result
            })
        } catch (e) {
            console.log(e)
            yield put({
                type: TODO_ADD_FAILURE,
                error: e.response && e.response.data
            })
        }
    })
}
*/

async function todoDeleteAPI(id) {
    //api 호출
    const result = await firebase
        .database()
        .ref(`todo/${id}`)
        .remove();

    //return textData;
}

function* TodoDelete(action) {
    try {
        const result = yield call(todoDeleteAPI, action.id);
        yield put({
            type: TODO_DELETE_SUCCESS,
            data: action.data
        })
    } catch (e) {
        console.log(e)
        yield put({
            type: TODO_DELETE_FAILURE,
            error: e.response && e.response.data
        })
    }
}

function* watchTodoDelete() {
    yield takeLatest(TODO_DELETE_REQUEST, TodoDelete)
}

export default function* todo() {
    yield all([
        fork(watchfetchData),
        fork(watchTodoAdd),
        fork(watchTodoDelete),
    ]);
}