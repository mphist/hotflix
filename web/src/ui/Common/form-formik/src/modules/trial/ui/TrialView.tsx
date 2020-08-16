import React from "react";
import { Form, Button } from "antd";
import {
  withFormik,
  FormikProps,
  Field,
  Form as FForm,
  FormikErrors,
} from "formik";
import * as yup from "yup";
import { inputField } from "../../shared/inputField";
import axios from "axios";

interface FormValues {
  email: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues>> | null;
}

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

const MyForm = (props: FormikProps<FormValues> & Props) => {
  return (
    <FForm style={{ margin: "auto", display: "flex", marginTop: "30px" }}>
      <Field
        className="register-input"
        name="email"
        placeholder="Email address"
        //prefix={<UserOutlined className="site-form-item-icon" />}
        component={inputField}
        style={{
          //width: "500px",
          fontSize: "17px",
          padding: "20px",
        }}
      />
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{
            backgroundColor: "#e50914",
            border: "none",
          }}
        >
          GET STARTED {">"}
        </Button>
      </Form.Item>
    </FForm>
  );
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    //@ts-ignore
    .check_email("This email is already taken.")
    .min(8, "Email not long enough!")
    .max(255)
    .required("Email is required!"),
  /*  password: yup
    .string()
    .min(3, "Password not long enough!")
    .max(255)
    .required(), */
  //name: yup.string().required(),
  //age: yup.number().required().positive().integer(),

  //website: yup.string().url(),
  /* createdOn: yup.date().default(function () {
    return new Date();
  }), */
});

const TrialView = withFormik<Props, FormValues>({
  validationSchema,
  mapPropsToValues: () => ({
    email: "",
  }),

  handleSubmit: async (values, { props }) => {
    const errors = await props.submit(values);
    if (!errors) {
      sessionStorage.setItem("email", values.email);
      window.location.replace("/register");
    }
  },
})(MyForm);

export default TrialView;
