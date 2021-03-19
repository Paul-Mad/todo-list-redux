import { createSelector } from "reselect";

//instead of referring to the state in all components, we use selectors
export const getTodos = (state) => state.todos.data;
export const getTodosLoading = (state) => state.todos.isLoading;

export const getIncompleteTodos = createSelector(getTodos, (todos) =>
  todos.filter((todo) => !todo.isCompleted)
);

export const getCompletedTodos = createSelector(getTodos, (todos) =>
  todos.filter((todo) => todo.isCompleted)
);

// export const getCompletedTodos = (state) => {
//   const { data: todos } = state.todos;
//   return todos.filter((todo) => todo.isCompleted);
// };
