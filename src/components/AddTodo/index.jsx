import classNames from "classnames";
import InputField from 'components/CustomField/InputField';
import { FastField, Form, Formik } from 'formik';
import createNotification from 'functions/createNotification';
import generatorKey from "functions/generatorKey";
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoItem } from 'store/todoSlice';
import * as Yup from "yup";
import AddButton from "./add_button.png";
import "./style.scss";

function AddTodo(props) {
  const initialValues = {
    todo: ""
  };
  const button = {
    width: "100px",
    height: "50px",
  };
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const todoList = useSelector(state => state.todoList);

  const validationChema = Yup.object().shape({
    todo: Yup.string().required("This field is required"),
  });

  const getRemainingTodo = () => {
    let result = 0;
    todoList.forEach(item => {
      if(!item.isDone) result++;
    })
    return result;
  }

  const handleClickAddButton = () => {
    setShow(true);
  }
  const handleCloseAddTodoForm = () => {
    setShow(false);
  }
  const handleSubmitAddTodoForm = (values) => {
    const item = {
      id: generatorKey(16),
      content: values.todo,
      isDone: false
    }
    const action = addTodoItem(item);
    dispatch(action);

    setShow(false);
    createNotification(
      "success",
      `Đã thêm "${values.todo.length > 20 ? values.todo.slice(0,20)+'...' : values.todo}" !`,
      " ",
      3000
    );
  };
  
  return (
    <div className="AddTodo">
      <img src={AddButton} alt="+" 
        className={classNames("AddTodo__button", {"AddTodo__button__click": show})}
        onClick={handleClickAddButton}  
      />
      <div className="AddTodo__remaining">Cần hoàn thành <span className="AddTodo__remaining__value">{getRemainingTodo()}</span></div>
      <Modal show={show} onHide={handleCloseAddTodoForm} size="md" centered>
      <Modal.Header>
          <Modal.Title>Thêm công việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationChema}
            onSubmit={handleSubmitAddTodoForm}
          >
          {
            <Form>
              <FastField
                name="todo"
                component={InputField}

                placeholder="Bạn cần phải làm gì ..."
              />
              <div className="d-flex">
                <Button className="ml-auto mr-2" variant="danger" type="submit" onClick={handleCloseAddTodoForm} style={{...button}}>Đóng</Button>
                <Button variant="success" type="submit" style={{...button}}>Thêm</Button>
              </div>
            </Form>
          }
          </Formik>
        </Modal.Body>
        
      </Modal>
    </div>
  );
}

export default AddTodo;