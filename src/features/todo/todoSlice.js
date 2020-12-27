import { createSlice } from '@reduxjs/toolkit';

let todoId = 1;

export const slice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    create: (state, action) => {
      const { payload } = action;

      state.push({
        id: todoId,
        description: payload,
        isComplete: false,
      });
      todoId += 1;
    },
    edit: (state, action) => {
      const {
        payload: { id, description },
      } = action;

      const todoToEdit = state.find((todo) => todo.id === id);
      if (todoToEdit) {
        todoToEdit.description = description;
      }
    },
    toggleComplete: (state, action) => {
      const {
        payload: { id },
      } = action;

      const todoToToggle = state.find((todo) => todo.id === id);
      if (todoToToggle) {
        todoToToggle.isComplete = !todoToToggle.isComplete;
      }
    },
    remove: (state, action) => {
      console.log('action', action);
      const {
        payload: { id },
      } = action;

      const todoToDeleteIndex = state.findIndex((todo) => todo.id === id);
      if (todoToDeleteIndex !== -1) {
        state.splice(todoToDeleteIndex, 1);
      }
    },
  },
});

export const selectTodos = (state) => state.todos;

export const { create, edit, toggleComplete, remove } = slice.actions;

export default slice.reducer;
