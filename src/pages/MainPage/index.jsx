import AddTodo from 'components/AddTodo';
import Loading from 'components/Loading';
import ShowDate from 'components/ShowDate';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import "./style.scss";

function MainPage(props) {
  const [loaded, setLoaded] = useState(false);

  document.title = "Todo-app v2"
  
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000)
  }, [])
  
  return (
    loaded ? 
      <div className="MainPage">
        <Container>
          <Row>
            <Col lg="3" md="2"/>
            <Col lg="6" md="8" className="MainPage__main">
              <ShowDate/>
              <AddTodo/>
            </Col>
          </Row>
        </Container>
      </div>
    : <Loading/>
  );
}

export default MainPage;