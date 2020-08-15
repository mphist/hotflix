import { formatYupError } from "../../../utils/formatYupError";
import { User } from "../../../entity/User";
import bcrypt from "bcryptjs";

import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().nullable().email().min(3).max(50),
  phone: yup.string().max(50),
  password: yup.string().max(50),
});

export const login = async (_, args, { session }) => {
  const { email, phone, password } = args;

  try {
    await schema.validate(args, { abortEarly: false });
  } catch (err) {
    return formatYupError(err);
  }

  const user = await User.findOne({ where: { email } });
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      // if login was successful, save user id in session
      session.userId = user.id; // this does not get saved for some reason
      session.email = user.email;
      //console.log("session.userId", session.userId);

      return [
        { path: "null", error: "null", userId: user.id, email: user.email },
      ];
    }
    return [{ path: "password", error: "incorrect password" }];
  }
  return [{ path: "email", error: "email does not exist" }];
};
