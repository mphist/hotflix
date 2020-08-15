import { useReducer } from "react";
import { reducer, initialState, login } from "../../../../../../../context";

interface Props {
  children: (data: {
    submit: (values: any) => Promise<any> | null;
  }) => JSX.Element | null;
}

const LoginController = (props: Props) => {
  const submit = async (values: any) => {
    //do something
    return null;
  };
  return props.children({ submit });
};

export default LoginController;
