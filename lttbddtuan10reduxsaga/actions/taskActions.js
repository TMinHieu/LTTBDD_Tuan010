// taskActions.js
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

export const fetchTasksRequest = () => ({ type: FETCH_TASKS_REQUEST });
export const fetchTasksSuccess = (tasks) => ({ type: FETCH_TASKS_SUCCESS, payload: tasks });
export const fetchTasksFailure = (error) => ({ type: FETCH_TASKS_FAILURE, payload: error });

export const deleteTaskRequest = (id) => ({ type: DELETE_TASK_REQUEST, payload: id });
export const deleteTaskSuccess = (id) => ({ type: DELETE_TASK_SUCCESS, payload: id });
export const deleteTaskFailure = (error) => ({ type: DELETE_TASK_FAILURE, payload: error });
