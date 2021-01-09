import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const slice = createSlice({
  name: "todo",
  initialState: {
    todoList: [],
    option: 1
  },
  reducers: {
    loadTodoList(state, action){
      const todoList = action.payload.todoList;
      if(todoList) state.todoList = todoList;
    },
    addTodoItem(state, action){
      state.todoList.push(action.payload);
      cookies.set('todoList', state.todoList); 
    },
    editTodoItem(state, action){
      state.todoList[action.payload.idx].content = action.payload.content;
      cookies.set('todoList', state.todoList); 
    },
    tickTodoItem(state, action){
      state.todoList[action.payload.idx].isDone = action.payload.isDone;
      cookies.set('todoList', state.todoList); 
    },
    removeTodoItem(state, action){
      state.todoList.splice(action.payload.idx, 1);
      cookies.set('todoList', state.todoList); 
    },
    removeCompleted(state, action){
      state.todoList = action.payload.todoListx;
      cookies.set('todoList', state.todoList); 
    },
    changeOption(state, action){
      state.option = action.payload.option;
    }
  }
});

const { actions, reducer } = slice;
export const { loadTodoList, addTodoItem, tickTodoItem, removeTodoItem, editTodoItem, removeCompleted, changeOption } = actions;
export default reducer;