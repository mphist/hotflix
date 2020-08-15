type State = {
  email: string | null;
};

export const initialState: State = {
  email: null,
};

const LOGIN = "LOGIN";

export const login = (email: string) => ({ type: LOGIN, email });

type Action = ReturnType<typeof login>;

export const reducer = (state = initialState, action: Action): State => {
  console.log("reducer called");
  switch (action.type) {
    case LOGIN:
      return { ...state, email: action.email };
    default:
      return state;
  }
};
