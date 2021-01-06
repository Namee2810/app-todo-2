import AddTodo from 'components/AddTodo';
import Loading from 'components/Loading';
import ShowDate from 'components/ShowDate';
import TodoList from 'components/TodoList';
import createNotification from "createNotification";
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import "./style.scss";

function MainPage(props) {
  const [loaded, setLoaded] = useState(false);

  document.title = "Todo-app v2";
  document.documentElement.lang = "vi";
  
  useEffect(() => {
    createNotification("warning", "Đang kết nối ...", " ", 1000);
    setTimeout(() => {
      setLoaded(true);
      createNotification("success", "Đã kết nối!", " ", 2000);
    }, 1000);
  }, []);
  
  return (
    loaded ? 
      <div className="MainPage">
        <Container>
          <Row>
            <Col lg="3" md="2"/>
            <Col lg="6" md="8" className="MainPage__main">
              <ShowDate/>
              <AddTodo/>
              <TodoList/>
            </Col>
          </Row>
        </Container>
      </div>
    : <Loading/>
  );
}

export default MainPage;