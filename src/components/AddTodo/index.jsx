import InputField from 'components/CustomField/InputField';
import createNotification from 'createNotification';
import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoItem } from 'store/todoSlice';
import * as Yup from "yup";
import AddButton from "./add-button.png";
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
  const state = useSelector(state => state);

  const validationChema = Yup.object().shape({
    todo: Yup.string().required("This field is required"),
  });

  const handleClickAddButton = () => {
    setShow(true);
  }
  const handleCloseAddTodoForm = () => {
    setShow(false);
  }
  const handleSubmitAddTodoForm = (values) => {
    const action = addTodoItem({
      id: state.todoList.length,
      content: values.todo
    });
    dispatch(action);
    setShow(false);
    createNotification(
      "success",
      `Đã thêm "${values.todo.length > 20 ? values.todo.slice(20)+'...' : values.todo}" !`,
      " ",
      3000
    );
  };
  
  return (
    <div className="AddTodo">
      <img className="AddTodo__button"
        src={AddButton} alt="+" width="72px" height="72px"
        onClick={handleClickAddButton}
      />
      <Modal show={show} onHide={handleCloseAddTodoForm} size="md" centered>
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