import { request } from "graphql-request";
import { createTypeOrmConn } from "../../utils/createTypeOrmConn";
import { User } from "../../entity/User";

const mutation = (
  email: string | null,
  phone: string | null,
  password: string
) => `
mutation {
    register(email: "${email}", phone:"${phone}" password: "${password}") {
      path
      error
      confirmationEmail
    }
}
`;

beforeAll(async () => {
  await createTypeOrmConn();
});

describe("Register a user", () => {
  const host = "http://localhost:4000/graphql";

  it("register user with email and hash password", async () => {
    // "it" is an alias for test
    const email1 = "test1@test.com";
    const phone1 = null;
    const password1 = "testtest";
    const response1 = await request(host, mutation(email1, phone1, password1));
    const users1 = await User.find({ where: { email: email1 } });
    const user1 = users1[0];

    // make sure user can be registered and confirmation email is sent to user's email
    expect(response1).toEqual({
      register: [{ error: "null", path: "null", confirmationEmail: "sent" }],
    });

    // make sure password is hashed before getting stored in db
    expect(user1.password).not.toEqual(password1);
  });

  it("check for duplicate emails", async () => {
    const email2 = "test1@test.com";
    const phone2 = null;
    const password2 = "testtest";
    const response2 = await request(host, mutation(email2, phone2, password2));
    expect(response2.register).toContainEqual({
      error: "This email is already taken",
      path: "email",
      confirmationEmail: null,
    });
  });

  it("check for invalid email", async () => {
    const email3 = "test3@@testtest";
    const phone3 = null;
    const password3 = "testtest";
    const response3 = await request(host, mutation(email3, phone3, password3));
    expect(response3.register[0].path).toEqual("email");
  });

  it("check if password is long enough", async () => {
    const email4 = "test4@test.test";
    const phone4 = null;
    const password4 = "test";
    const response4 = await request(host, mutation(email4, phone4, password4));
    expect(response4.register).toContainEqual({
      error: "password must be at least 8 characters",
      path: "password",
      confirmationEmail: null,
    });
  });

  /*   it("if user registers with phone number, don't send confirmation email", async () => {
    const email5 = null;
    const phone5 = "123-456-7891";
    const password5 = "testtest";
    const response5 = await request(host, mutation(email5, phone5, password5));
    expect(response5.register[0].confirmationEmail).toBeNull();
  }); */
});
