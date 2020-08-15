import { createTypeOrmConn } from "../../utils/createTypeOrmConn";
import request from "graphql-request";

const mutation = (
  email: string | null,
  phone: string | null,
  password: string,
  type: string
) => {
  if (type === "login")
    return `
        mutation {
            login(email: "${email}", phone:"${phone}" password: "${password}") {
                path
                error
            }
        }
    `;

  if (type === "register")
    return `
        mutation {
            register(email: "${email}", phone:"${phone}" password: "${password}") {
                path
                error
                confirmationEmail
            }
        }
    `;
};

beforeAll(async () => {
  await createTypeOrmConn();
});

describe("Login a user", () => {
  const host = "http://localhost:4000/graphql";

  it("a user should be able to log in", async () => {
    const email = "test1@test.com";
    const phone = null;
    const password = "testtest";
    const response1 = await request(
      host,
      mutation(email, phone, password, "register")
    );
    const response2 = await request(
      host,
      mutation(email, phone, password, "login")
    );
    expect(response2.login[0].path).toEqual("null");
  });

  it("incorrect password should be rejected", async () => {
    const email = "test1@test.com";
    const phone = null;
    const password = "incorrectpw";
    const response = await request(
      host,
      mutation(email, phone, password, "login")
    );
    expect(response.login[0].path).toEqual("password");
  });

  it("non-existing email should be rejected", async () => {
    const email = "idontexist@test.com";
    const phone = null;
    const password = "testtest";
    const response = await request(
      host,
      mutation(email, phone, password, "login")
    );
    expect(response.login).toContainEqual({
      path: "email",
      error: "email does not exist",
    });
  });
});
