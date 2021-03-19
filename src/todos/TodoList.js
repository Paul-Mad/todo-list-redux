import React, { useEffect } from "react";
import { connect } from "react-redux";
import NewTodoForm from "./NewTodoForm";
import styled from "styled-components";
import {
  getTodosLoading,
  getCompletedTodos,
  getIncompleteTodos,
} from "./selectors";
import {
  loadtodos,
  markTodoAsCompletedRequest,
  removeTodoRequest,
} from "./thunks";
import TodoListItem from "./TodoListItem";

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;
const TodoList = (
  {
    completedTodos,
    incompletedTodos,
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
    <ListWrapper>
      <NewTodoForm />
      <h3>Incomplete:</h3>
      {incompletedTodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
      <h3>Completed:</h3>
      {completedTodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
    </ListWrapper>
  );
  return isLoading ? loadingMessage : content;
};

// object that represents the entire redux state
const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state), // Using selectors to get the data from the state
  completedTodos: getCompletedTodos(state),
  incompletedTodos: getIncompleteTodos(state),
});

//Take the state object and return another object with pieces of state that component needs access to
const mapDispatchToProps = (dispatch) => ({
  startLoadingTodos: () => dispatch(loadtodos()),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
