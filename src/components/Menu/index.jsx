import classNames from "classnames";
import createNotification from "functions/createNotification";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { changeOption, removeCompleted } from "store/todoSlice";
import { ReactComponent as MenuButton } from "./menu.svg";
import "./style.scss";

function Menu(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [option, setOption] = useState(0);
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todoList);


  let remainingTodo = 0;
  todoList.forEach(item => {
    if(!item.isDone) remainingTodo++;
  })
  const handleClickMenu = () => {
    setShowMenu(!showMenu);
  }
  const handleClickAll = () => {
    if(option !== 1) {
      setShowMenu(false);
      setOption(1);
      document.getElementById("TodoList").classList.add("TodoList__hide");
      setTimeout(() => {
        const action = changeOption({option: 1});
        dispatch(action);
        document.getElementById("TodoList").classList.remove("TodoList__hide");
      }, 500);
    }
  }
  const handleClickCompleted = () => {
    if(option !== 2){
      setShowMenu(false);
      setOption(2);
      document.getElementById("TodoList").classList.add("TodoList__hide")
      setTimeout(() => {
        document.getElementById("TodoList").classList.remove("TodoList__hide")
        const action = changeOption({option: 2});
        dispatch(action);
      }, 500);
    }
  }
  const handleClickUnCompleted = () => {
    if(option !== 3){
      setShowMenu(false);
      setOption(3);
      document.getElementById("TodoList").classList.add("TodoList__hide");
      setTimeout(() => {
        document.getElementById("TodoList").classList.remove("TodoList__hide")
        const action = changeOption({option: 3});
        dispatch(action);
      }, 500);
    }
  }
  const handleClickRemoveCompleted = () => {
    const todoListx = todoList.filter(item => !item.isDone);
    const action = removeCompleted({
      todoListx
    });
    dispatch(action);
    createNotification("success", "Đã xóa các công việc đã hoàn thành !", " ", 2000);
  };

  return (
    <div className="Menu">
      <MenuButton className={classNames("Menu__button", {"Menu__button--active": showMenu})} onClick={handleClickMenu}/>
      <div className={classNames("Menu__bar d-flex flex-column", {"Menu__bar__show": showMenu})}>  
        <div className={classNames("Menu__bar__item", {"Menu__bar__item--active": option===1})}
          onClick={todoList.length ? handleClickAll : undefined}
        >
          Tất cả {`(${todoList.length})`}
        </div>
        <div className={classNames("Menu__bar__item", {"Menu__bar__item--active": option===2})}
          onClick={todoList.length-remainingTodo ? handleClickCompleted : undefined}
        >
          Hoàn thành {`(${todoList.length-remainingTodo})`}
        </div>
        <div className={classNames("Menu__bar__item", {"Menu__bar__item--active": option===3})}
          onClick={remainingTodo ? handleClickUnCompleted : undefined}
        >
          Chưa hoàn thành {`(${remainingTodo})`}
        </div>
        <div className="Menu__bar__item" onClick={handleClickRemoveCompleted}>Xóa hoàn thành</div>
      </div>
    </div>
  );
}

export default Menu;