import classNames from "classnames";
import InputField from "components/CustomField/InputField";
import { FastField, Form, Formik } from "formik";
import createNotification from "functions/createNotification";
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { editTodoItem, removeTodoItem, tickTodoItem } from "store/todoSlice";
import * as Yup from "yup";
import { ReactComponent as Remove } from "./remove.svg";
import "./style.scss";
import { ReactComponent as Tick } from "./tick.svg";
import { ReactComponent as TickDone } from "./tick_done.svg";

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired
}

TodoItem.defaultProps = {
  id: "",
  content: "",
  isDone: false,
}

function TodoItem(props) {
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todoList);
  const [showDetail, setShowDetail] = useState(false);
  const [tick, setTick] = useState(false);
  const [edit, setEdit] = useState(false);
  const { id, content, isDone } = props;

  const idx = todoList.findIndex(item => item.id === id);
  //Detail
  const handleClickDetail = () => {
    setShowDetail(true);
  }
  const handleCloseDetail = () => {
    setShowDetail(false);
  }

  //Tick
  const handleClickTick = () => {
    const action = tickTodoItem({idx, isDone: !isDone});
    dispatch(action);
    setTick(!tick);
    isDone 
      ? createNotification(
        "warning",
        `Chưa hoàn thành công việc "${content.length > 30 ? content.slice(0,30)+'...' : content}" !`,
        " ",
        2500
      )
      : createNotification(
        "success",
        `Đã hoàn thành công việc "${content.length > 30 ? content.slice(0,30)+'...' : content}" !`,
        " ",
        2500);
  }

  //Remove
  const handleClickRemove = () => {
    createNotification(
      "danger",
      `Đã xóa công việc "${content.length > 30 ? content.slice(0,30)+'...' : content}"!`,
      " ",
      2500
    );

    document.getElementById(id).classList.add("TodoItem__remove__click");

    setTimeout(() => {
      const action = removeTodoItem({idx});
      dispatch(action);
    }, 500);
  }

  //Edit
  const initialValues = {
    content: ""
  };
  const handleClickContent = () => {
    setEdit(true);
  }
  const handleCloseEditTodoForm = () => {
    setEdit(false);
  }
  const validationChema = Yup.object().shape({
    content: Yup.string().required("This field is required"),
  });
  const handleSubmitEditTodoForm = (values) => {
    const content = values.content;
    const action = editTodoItem({idx, content});
    setTimeout(() => {
      dispatch(action);
      document.getElementById(id+"_content").classList.remove("TodoItem__content__edited");
    }, 500);
    document.getElementById(id+"_content").classList.add("TodoItem__content__edited");
    setEdit(false);
    createNotification(
      "success",
      "Chỉnh sửa thành công !",
      " ",
      2500
    );

  }

  return (
    <div className="TodoItem" id={id}>
      <Modal
        size="lg"
        show={showDetail}
        onHide={handleCloseDetail}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết công việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseDetail}>Đóng</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={edit} onHide={handleCloseEditTodoForm} size="md" centered>
        <Modal.Header>
          <Modal.Title>Chỉnh sửa công việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationChema}
            onSubmit={handleSubmitEditTodoForm}
          >
          {
            <Form>
              <FastField
                name="content"
                component={InputField}
              />
              <div className="d-flex">
                <Button className="ml-auto mr-2" variant="danger" type="submit" onClick={handleCloseEditTodoForm}>Đóng</Button>
                <Button variant="success" type="submit">Xong</Button>
              </div>
            </Form>
          }
          </Formik>
        </Modal.Body>
        
      </Modal>
      <Row>
        <Col xs="10">
          <div className={classNames("TodoItem__content", {"TodoItem__content__isDone": isDone})} id={id+"_content"} onClick={handleClickContent}>
            {
              content.length > 110
              ? <p>{content.slice(0, 100)+"...  "} 
                  <span onClick={handleClickDetail} style={{color: "#0D8BF0", cursor: "pointer"}}>Chi tiết</span>
                </p>
              : <p>{content}</p>
            }
          </div>
        </Col>
        <Col xs="2" className="d-flex justify-content-around">
          <div className={classNames("TodoItem__tick", {"TodoItem__tick__click": tick})} onClick={handleClickTick}>
          {
            isDone ? <TickDone/> : <Tick/>
          }
          </div>
          <div>
            <Remove onClick={handleClickRemove} className="TodoItem__remove ml-2"/>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default TodoItem;