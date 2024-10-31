// store.js
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { taskSaga } from '../sagas/taskSaga';
import taskReducer from '../reducers/taskReducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(taskReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(taskSaga);

export default store;
