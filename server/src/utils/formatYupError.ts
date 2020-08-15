import { ValidationError } from "yup";

export const formatYupError = (err: ValidationError) => {
  const errors: Array<{ path: string; error: string }> = [];
  err.inner.forEach((e) => {
    errors.push({
      path: e.path,
      error: e.errors[0],
    });
  });
  return errors;
};
