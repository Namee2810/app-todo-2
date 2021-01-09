import TodoItem from 'components/TodoItem';
import React from 'react';
import { useSelector } from "react-redux";
import "./style.scss";

function TodoList(props) {
  const { todoList, option } = useSelector(state => state);
  let todoListShow;
  switch(option){
    case 1: {
      todoListShow = todoList;
      break;
    }
    case 2: {
      todoListShow = todoList.filter(item => item.isDone === true);
      break;
    }
    case 3: {
      todoListShow = todoList.filter(item => item.isDone === false);
      break;
    }
    default: {
      if (window.confirm("Mã lỗi #1:\nHãy thử tại lại trang hoặc liên hệ quản trị viên, nhấn 'OK' để liên hệ!"))
        window.location.href="https://www.facebook.com/namee2810/";
    }
  }

  return (
    <div className="TodoList" id="TodoList">
    {
      todoListShow && todoListShow.map(item => (
        <TodoItem key={item.id} id={item.id} content={item.content} isDone = {item.isDone}/>
      ))
    }
    </div>
  );
}

export default TodoList;