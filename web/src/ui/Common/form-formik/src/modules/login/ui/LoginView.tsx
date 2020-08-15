import React, { useContext, useReducer } from "react";
import { Form, Button } from "antd";
import { inputField } from "../../shared/inputField";
import * as yup from "yup";
import axios from "axios";
import { withFormik, Field, Form as FForm, FormikErrors, Formik } from "formik";
import { Link, Redirect, Route, useHistory } from "react-router-dom";
import { passwordField } from "../../shared/passwordField";
import { AuthContext } from "../../../../../../Common/Context/auth";
import { reducer, initialState } from "../../../../../../../context/index";
import { login } from "../../../../../../../context";

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit?: (values: FormValues) => Promise<FormikErrors<FormValues>> | null;
  email?: string | null;
  dispatch?: React.Dispatch<{
    type: string;
    email: string;
  }>;
}

const validationschema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .min(8, "Email not long enough!")
    .max(50)
    .required("Email is a required field."),
  password: yup.string().required("Password is a required field."),
});

const LoginView = ({ submit }: Props) => {
  const el = document.getElementById("invalid-login");
  if (
    el &&
    document.body.innerText.indexOf("Password is a required field.") > 0
  ) {
    document.getElementsByClassName("ant-form-item-explain")[0].remove();
  }

  //const [user, dispatch] = useReducer(reducer, initialState);
  const { email, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (values: FormValues) => {
    console.log(
      "env",
      process.env.NODE_ENV,
      process.env.REACT_APP_BACKEND_HOST
    );
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_HOST + "/login",
        values,
        {
          withCredentials: true,
        }
      );
      console.log("checking response", response.data);

      const { redirectUrl, id, email } = response.data;
      // login successful
      if (redirectUrl) {
        console.log("login successful");
        dispatch(login(email));
        sessionStorage.setItem("user", email);
        history.push("/browse");
      } else {
        if (
          document.body.innerText.indexOf("Password is a required field.") < 0
        ) {
          document.getElementsByClassName(
            "ant-row ant-form-item ant-form-item-has-success"
          )[1].className =
            "ant-row ant-form-item ant-form-item-with-help ant-form-item-has-error";

          if (
            document.getElementsByClassName("ant-form-item-explain").length < 1
          ) {
            const divEl1 = document.getElementsByClassName(
              "ant-col ant-form-item-control"
            )[1];
            const divEl2 = document.createElement("div");
            divEl2.className = "ant-form-item-explain";
            const divEl3 = document.createElement("div");
            divEl3.id = "invalid-login";
            const errorMsg = document.createTextNode("Invalid login.");
            divEl3.appendChild(errorMsg);
            divEl2.appendChild(divEl3);
            divEl1.appendChild(divEl2);
          }
        }
      }
    } catch (err) {
      if (err.message === "Request failed with status code 404") {
        alert(
          "Oops... Looks like our server is down. We will be right with you."
        );
      } else {
        console.log("error", err);
        alert("Something went wrong. We are looking into it~~");
      }
    }
    if (submit) {
      const errors = await submit(values);
      if (errors) {
        console.log("errors", errors);
      }
    }
  };

  const showPassword = false;

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, actions) => {
        handleSubmit(values);
      }}
      validationSchema={validationschema}
    >
      <FForm>
        <Field
          className="email-phone-input"
          name="email"
          placeholder="Email"
          component={inputField}
        />
        <Field
          className="password-input"
          name="password"
          placeholder="Password"
          component={passwordField}
          type={showPassword ? "text" : "password"}
        />

        <Form.Item style={{ paddingTop: "30px" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign In
          </Button>
          <div className="login-form-help">
            <input type="checkbox" className="rememberMe" />
            <label className="rememberMe-label" htmlFor="">
              <span className="login-remember-me-text">Remember me</span>
            </label>
            <Link className="need-help-link" to="/LoginHelp">
              Need help?
            </Link>
          </div>
        </Form.Item>
      </FForm>
    </Formik>
  );
};

const LoginViewToWrap = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({
    email: "",
    password: "",
  }),

  handleSubmit: async (values, { props }) => {
    //POST to server /login
  },
})(LoginView);

export default LoginView;
