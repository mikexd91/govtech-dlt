/* eslint-disable import/prefer-default-export */
const BASE_TASKLISTS_URL = 'http://localhost:5000/v1/api/tasklist';
const BASE_USERS_URL = 'http://localhost:5000/v1/api/user';

// USER API
export const fetchUsers = async () => {
  const result = await fetch(`${BASE_USERS_URL}`, {
    method: 'GET',
    credentials: 'include',
  });
  const jsonResult = await result.json();
  return jsonResult.data;
};

export const fetchUsersById = async (userId) => {
  const result = await fetch(`${BASE_USERS_URL}?user${userId}`, {
    method: 'GET',
    credentials: 'include',
  });
  const jsonResult = await result.json();
  return jsonResult.data;
};

export const registerUser = async (data) => {
  const result = await fetch(`${BASE_USERS_URL}/register`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
  const jsonResult = await result.json();
  return jsonResult.data;
};

export const loginUser = async (data) => {
  const result = await fetch(`${BASE_USERS_URL}/login`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
  const jsonResult = await result.json();
  return jsonResult.data;
};

// TASK API
export const fetchAllTasklists = async () => {
  const result = await fetch(`${BASE_TASKLISTS_URL}/all`, {
    method: 'GET',
    credentials: 'include',
  });
  const jsonResult = await result.json();
  return jsonResult.data;
};

export const fetchTasklistById = async (taskListId, userId) => {
  const result = await fetch(`${BASE_TASKLISTS_URL}/${taskListId}?user=${userId}`, {
    method: 'GET',
    credentials: 'include',
  });
  const jsonResult = await result.json();
  return jsonResult.data;
};

export const addTasktoTasklist = async (taskListId, data, userId) => {
  const result = await fetch(`${BASE_TASKLISTS_URL}/${taskListId}?user=${userId}`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
  const jsonResult = await result.json();
  return jsonResult.data;
};

export const updateTasklist = async (taskListId, data, userId) => {
  const result = await fetch(`${BASE_TASKLISTS_URL}/${taskListId}/task/${data.taskId}?user=${userId}`, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
  const jsonResult = await result.json();
  return jsonResult.data;
};

export const removeFromTasklist = async (taskListId, data, userId) => {
  const result = await fetch(`${BASE_TASKLISTS_URL}/${taskListId}/task/${data.taskId}?user=${userId}`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });
  const jsonResult = await result.json();
  return jsonResult.data;
};
