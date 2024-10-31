// taskSaga.js
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_TASKS_REQUEST,
  fetchTasksSuccess,
  fetchTasksFailure,
  DELETE_TASK_REQUEST,
  deleteTaskSuccess,
  deleteTaskFailure,
} from '../actions/taskActions';

const fetchTasksFromApi = () =>
  fetch('https://66fe14a0699369308956fc21.mockapi.io/user').then((response) => response.json());

function* fetchTasks() {
  try {
    const tasks = yield call(fetchTasksFromApi);
    yield put(fetchTasksSuccess(tasks));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

const deleteTaskFromApi = (id) =>
  fetch(`https://66fe14a0699369308956fc21.mockapi.io/user/${id}`, { method: 'DELETE' });

function* deleteTask(action) {
  try {
    yield call(deleteTaskFromApi, action.payload);
    yield put(deleteTaskSuccess(action.payload));
  } catch (error) {
    yield put(deleteTaskFailure(error.message));
  }
}

export function* taskSaga() {
  yield takeEvery(FETCH_TASKS_REQUEST, fetchTasks);
  yield takeEvery(DELETE_TASK_REQUEST, deleteTask);
}
