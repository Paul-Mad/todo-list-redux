import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodoRequest } from "./thunks";
import styled from "styled-components";
import { getTodos } from "./selectors";

// connect ()(NewTodoForm)  HOF

const FormContainer = styled.div`
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 8px grey;
`;
const NewTodoInput = styled.input`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-bottom: 2px solid #ddd;
  border-radius: 8px;
  width: 70%;
  outline: none;
`;
const NewTodoButton = styled.button`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  margin-left: 8px;
  width: 20%;
  background-color: #22ee22;
`;
const NewTodoForm = ({ todos, onCreatePressed }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <FormContainer>
      <NewTodoInput
        type="text"
        placeholder="Type your todo here"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <NewTodoButton
        onClick={() => {
          //Check if there is a duplicate text and is not empty
          const isDuplicateText = todos.some(
            (todo) => todo.text === inputValue
          );
          if (!isDuplicateText && inputValue !== "") {
            onCreatePressed(inputValue);
            setInputValue("");
          }
        }}
      >
        Create Todo
      </NewTodoButton>
    </FormContainer>
  );
};

// object that represents the entire redux state
const mapStateToProps = (state) => ({
  todos: getTodos(state), //using selectors to get the start data
});

//Take the state object and return another object with pieces of state that component needs access to
const mapDispatchToProps = (dispatch) => ({
  onCreatePressed: (text) => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
