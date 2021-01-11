import createNotification from "functions/createNotification";
import React, { useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loadTodoList } from 'store/todoSlice';
import Cookies from 'universal-cookie';
import "./style.scss";

const cookies = new Cookies();
const ShowDate = React.lazy(() => import('components/ShowDate'));
const AddTodo = React.lazy(() => import('components/AddTodo'));
const NavBar = React.lazy(() => import('components/NavBar'));
const TodoList = React.lazy(() => import('components/TodoList'));
const Menu = React.lazy(() => import('components/Menu'));

function MainPage(props) {
  
  const dispatch = useDispatch();

  document.title = "app-todo-v2";
  document.documentElement.lang = "vi";
  
  const todoList = cookies.get("todoList");
  const action = loadTodoList({todoList});
  dispatch(action);
  
  useEffect(() => {
    createNotification("success", "Đã kết nối !", " ", 2000);
    setTimeout(() => {
      document.getElementById("main").classList.add("MainPage__loaded");
    }, 500); 
  }, []);
  
  return (
    <div className="MainPage" id="main">
      <Container>
        <Row>
          <Col lg="3" md="2"/>
          <Col lg="6" md="8" className="MainPage__main">
            <ShowDate/>
            <AddTodo/>
            <NavBar/>
            <TodoList/>
          </Col>
        </Row> 
      </Container>
      <Menu/>
    </div>
  );
}

export default MainPage;