import React from "react";
import { FieldProps } from "formik";
import { Form, Input } from "antd";

export const passwordField: React.ComponentType<FieldProps & {}> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <Form.Item
    help={touched[field.name] && errors[field.name]}
    validateStatus={
      touched[field.name] && errors[field.name] ? "error" : "success"
    }
  >
    <Input.Password
      {...field}
      {...props}
      iconRender={(visible: any) => (visible ? "HIDE" : "SHOW")}
    />
  </Form.Item>
);
