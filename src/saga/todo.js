import { all, delay, fork, put, takeLatest, call, throttle, takeEvery } from 'redux-saga/effects';
import * as firebase from 'firebase';
import { 
    TODO_DATA_REQUEST, TODO_DATA_SUCCESS, TODO_DATA_FAILURE,
    TODO_ADD_REQUEST, TODO_ADD_SUCCESS, TODO_ADD_FAILURE
} from '../reducers/todo'

async function fetchDataAPI () {
    //api 호출
    const snapshot = await firebase.database().ref('todo').once('value');
    const todoObj = snapshot.val();
    const todo = Object.entries(todoObj).map(([id, company]) => ({
        ...company,
        id,
    }));

    return todo;

}

function* fetchData(action) {
    try {
        const result = yield call(fetchDataAPI);
        yield put({
            type: TODO_DATA_SUCCESS,
            data: result.data
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

async function todoAddAPI (textData) {
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

export default function* user() {
    yield all([
        fork(watchfetchData),
        fork(watchTodoAdd),
    ]);
}