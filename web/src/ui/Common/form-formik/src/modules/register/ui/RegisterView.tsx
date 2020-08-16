import React from "react";
import { Form, Button } from "antd";
import { inputField } from "../../shared/inputField";
import * as yup from "yup";
import axios from "axios";
import { withFormik, Field, Form as FForm, FormikErrors } from "formik";
import { passwordField } from "../../shared/passwordField";
import { login } from "../../../../../../../context";

interface FormValues {
  email: string;
  password1: string;
  password2: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues>> | null;
  dispatch?: React.Dispatch<{
    type: string;
    email: string;
  }>;
}

const RegisterForm = () => {
  const showPassword = false;
  return (
    <FForm>
      <Field
        className="email-phone-input"
        name="email"
        placeholder="Email"
        component={inputField}
      />
      <Field
        className="password-input-1"
        name="password1"
        placeholder="Password"
        component={passwordField}
        type={showPassword ? "text" : "password"}
      />
      <Field
        className="password-input-2"
        name="password2"
        placeholder="Re-enter password"
        component={passwordField}
        type={showPassword ? "text" : "password"}
      />
      <Form.Item style={{ paddingTop: "30px" }}>
        <Button
          type="primary"
          htmlType="submit"
          className="register-form-button"
        >
          Register
        </Button>
      </Form.Item>
    </FForm>
  );
};

/* yup.addMethod(yup.string, "email", function (msg) {
  return this.test("test-name", msg, function (value) {
    const { path, createError } = this;

    //perform phone number check
    const regex_phone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    const regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (regex_phone.test(value)) {
      return true;
    }
    //perform email check
    else if (regex_email.test(value)) {
      return true;
    }
    return false;
  });
}); */

const host =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BACKEND_HOST_PROD
    : process.env.REACT_APP_BACKEND_HOST_DEV;

yup.addMethod(yup.string, "check_email", function (msg) {
  //@ts-ignore
  return this.test("test-name", msg, async function (value) {
    if (
      (
        await axios.post(host + "/check_email", {
          email: value,
        })
      ).data === "email is good to use"
    )
      return true;
    return false;
  });
});

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email.")
    //@ts-ignore Property 'check_email' does not exist on type 'StringSchema<string>'
    .check_email("This email is already taken.")
    .min(8, "Email not long enough!")
    .max(50)
    .required("Email is a required field."),
  password1: yup
    .string()
    .min(8, "Password needs to be longer than 8 characters.")
    .required("Password is a required field."),
  password2: yup
    .string()
    .min(8, "Password needs to be longer than 8 characters.")
    .required("Password is a required field.")
    .oneOf([yup.ref("password1"), null], "Passwords must match."),
});

const RegisterView = withFormik<Props, FormValues>({
  validationSchema,
  mapPropsToValues: () => {
    const email = sessionStorage.getItem("email");
    return {
      email: email ? email : "",
      password1: "",
      password2: "",
    };
  },

  handleSubmit: async (values, { props }) => {
    //POST to server /register
    axios.post(host + "/register", values).then((res) => {
      props.dispatch
        ? props.dispatch(login(res.data.email))
        : console.log("dispatch undefined");
      sessionStorage.setItem("user", res.data.email);
      window.location.replace("/browse");
    });
    const errors = await props.submit(values);
    if (errors) {
      console.log("errors", errors);
    }
  },
})(RegisterForm);

export default RegisterView;
