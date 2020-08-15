import React from "react";
import { FieldProps } from "formik";
import { Form, Input } from "antd";

export const inputField: React.ComponentType<FieldProps & {}> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  return (
    <Form.Item
      help={touched[field.name] && errors[field.name]}
      validateStatus={
        touched[field.name] && errors[field.name] ? "error" : "success"
      }
    >
      <Input {...field} {...props} />
    </Form.Item>
  );
};
