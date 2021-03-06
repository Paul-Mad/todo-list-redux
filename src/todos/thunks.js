import {
  loadTodosInProgress,
  loadTodosFailure,
  loadTodosSuccess,
  createTodo,
  removeTodo,
  markTodoAsCompleted,
} from "./actions";

export const displayAlert = (text) => () => {
  alert(text);
};

//GET method
export const loadtodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadTodosInProgress());
    const response = await fetch("http://localhost:8080/todos");
    const todos = await response.json();

    dispatch(loadTodosSuccess(todos));
  } catch (error) {
    dispatch(loadTodosFailure);
    dispatch(displayAlert(error));
  }
};
// POST method
export const addTodoRequest = (text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text });

    const response = await fetch("http://localhost:8080/todos", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body,
    });

    const todo = await response.json();

    dispatch(createTodo(todo));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const removeTodoRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
    });
    const removedTodo = await response.json();
    dispatch(removeTodo(removedTodo));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};

export const markTodoAsCompletedRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8080/todos/${id}/completed`,
      { method: "POST" }
    );

    const markedTodo = await response.json();
    dispatch(markTodoAsCompleted(markedTodo));
  } catch (error) {
    dispatch(displayAlert(error));
  }
};
