const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
  name: "todo",
  initialState: {
    todoList: [{id: 0, content: "Hihih"}]
  },
  reducers: {
    addTodoItem(state, action){
      state.todoList.push(action.payload);
    },
    checkTodoItem(state, action){
      state.todoList[action.payload].isDone = !state.todoList[action.payload].isDone;
    },
    removeTodoItem(state, action){
      state.todoList.splice(action.payload, 1);
    },
  }
});

const { actions, reducer } = slice;
export const { addTodoItem, checkTodoItem, removeTodoItem } = actions;
export default reducer;