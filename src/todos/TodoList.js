import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./TodoList.css";
import NewTodoForm from "./NewTodoForm";
import { getTodos, getTodosLoading } from "./selectors";
import {
  loadtodos,
  markTodoAsCompletedRequest,
  removeTodoRequest,
} from "./thunks";
import TodoListItem from "./TodoListItem";
import { isLoading } from "./reducers";

const TodoList = (
  {
    todos = [{ text: "Hello" }],
    onRemovePressed,
    onCompletedPressed,
    isLoading,
    startLoadingTodos,
  } // default value to prevent error in app { todos =[]}
) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
  const loadingMessage = <div>Loading todos...</div>;
  const content = (
    <div className="list-wrapper">
      <NewTodoForm />
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
    </div>
  );
  return isLoading ? loadingMessage : content;
};

// object that represents the entire redux state
const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state), // Using selectors to get the data from the state
  todos: getTodos(state),
});

//Take the state object and return another object with pieces of state that component needs access to
const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadtodos()),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
