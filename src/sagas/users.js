import { call, put, fork, take, takeEvery, takeLatest } from "redux-saga/effects";
import * as actions from '../actions/users';
import * as api from '../api/users';


function* getUsers() {
    try {
        // here is a effect that a plain JS object containing instructions for saga middleware executes
        const result = yield call(api.getUsers); 
        // console.log('GetUsersRequest: ', result.data);
        yield put(actions.getUsersSuccess({
            items: result.data.data // middleware send the action
        }));
    } catch(e) {
        yield put(actions.fireUserError('An error occurred when trying to get the users'));
    }
}

function* watchGetUsersRequest() {
    yield  takeEvery(actions.Types.GET_USER_REQUEST, getUsers); // user send the action
}

function* getCreateUsers(createUser) {
    try {
        yield put(actions.getCreateUsers(createUser));
    } catch(e) {
        yield put(actions.fireUserError('An error occurred when trying to get the users'));
    }
}

let id = 12;
function* createUser(action) {
    try {
        // call api create user
        yield call(api.createUser, {
            firstName: action.payload.firstName,
            lastName: action.payload.lastName
        });
        // show new user in local
        yield id++;
        yield call(getCreateUsers, {
            id,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName
        });
    } catch(e) {
        yield put(actions.fireUserError('An error occurred when trying to create the user'));
    }
}

function* watchCreateUserRequest() {
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

function* getNonDeleteUsers(userId) {
    try {
        yield put(actions.getNonDeleteUsers(userId));
    } catch(e) {
        yield put(actions.fireUserError('An error occurred when trying to get the non-delete users'));
    }
}

function* deleteUser(action) {
    try {
        if(action.payload.confirm) {
            yield call(api.deleteUser, action.payload.userId);
            yield call(getNonDeleteUsers, action.payload.userId);
            yield put(actions.warnDeletingUser(''));
        } else {
            yield put(actions.warnDeletingUser(action.payload.userId));
        }
    } catch(e) {
        yield put(actions.fireUserError('An error occurred when trying to delete the user'));
    }
}

function* watchDeleteUserRequest() {
    while(true) {
        const action = yield take(actions.Types.DELETE_USER_REQUEST); // blocking: wait
        yield call(deleteUser, action);       
    }
}


function* watchGetNonDeleteUsersRequest() {
    while(true) {
        const action = yield take(actions.Types.GET_NON_DELETE_USERS_REQUEST); // blocking: wait
        yield call(getNonDeleteUsers, action.payload.userId);    
    }
}


const UsersSagas = [
    // there are tasks that is a process running in background
    // using fork to create tasks
    // fork is non-blocking: non wait
    fork(watchGetUsersRequest), 
    fork(watchCreateUserRequest), 
    fork(watchDeleteUserRequest),
    fork(watchGetNonDeleteUsersRequest),
];

export default UsersSagas;