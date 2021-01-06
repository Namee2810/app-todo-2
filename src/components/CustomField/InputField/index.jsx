import PropTypes from "prop-types";
import React from 'react';
import { FormGroup, Input } from "reactstrap";
import "./style.scss";

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  placeholder: PropTypes.string,
  disable: PropTypes.string
}

InputField.defaultProps = {
  type: "text",
  placeholder: "",
  disable: "false"
}

function InputField(props) {
  const {
    field, form,
    type, placeholder, disable,
  } = props;
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  return (
    <FormGroup>
      <Input className="Input"
        id={name}
        {...field}

        type={type}
        disable={disable}
        placeholder={placeholder}

        invalid={showError}
      />
    </FormGroup>
  );
}

export default InputField;