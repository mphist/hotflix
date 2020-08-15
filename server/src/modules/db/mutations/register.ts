import { formatYupError } from "../../../utils/formatYupError";
import { createConfirmEmailLink } from "../../../utils/createConfirmEmailLink";
import Redis from "ioredis";
import { sendConfirmEmailLink } from "../../../utils/sendConfirmEmailLInk";
import { User } from "../../../entity/User";
import bcrypt from "bcryptjs";

import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().nullable().email().min(3).max(50).notRequired(),
  phone: yup.string().max(50),
  password: yup.string().min(8).max(50),
});

export const register = async (_, args, { url }) => {
  const { email, phone, password } = args;
  const userAlreadyExists = await User.findOne({ where: { email } });
  if (userAlreadyExists) {
    return [{ path: "email", error: "This email is already taken" }];
  }

  try {
    await schema.validate(args, { abortEarly: false });
  } catch (err) {
    return formatYupError(err);
  }

  const hashedPw = await bcrypt.hash(password, 10);
  const user = User.create({
    email,
    phone,
    password: hashedPw,
  });
  await user.save();

  const userId = user.id;
  const link = await createConfirmEmailLink(userId, url, new Redis());

  if (email !== null) {
    await sendConfirmEmailLink(link, email);
    return [{ path: "null", error: "null", confirmationEmail: "sent" }];
  }

  return [{ path: "null", error: "null", confirmationEmail: null }];
};
