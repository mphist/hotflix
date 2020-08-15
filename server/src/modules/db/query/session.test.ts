import axios from "axios";
import { createTypeOrmConn } from "../../../utils/createTypeOrmConn";

beforeAll(async () => {
  await createTypeOrmConn();
});

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

const session = () =>
  `
  {
      session {
          userId
      }
  }
  `;

describe("Test session", () => {
  const host = "http://localhost:4000/graphql";
  it("If login was successful, user id should be saved in session", async () => {
    const email = "test-session@test.test";
    const phone = null;
    const password = "testtest";
    await axios.post(
      host,
      { query: mutation(email, phone, password, "register") },
      { withCredentials: true }
    );
    await axios.post(
      host,
      { query: mutation(email, phone, password, "login") },
      { withCredentials: true }
    );
    const response = await axios.post(
      host,
      { query: session() },
      { withCredentials: true }
    );

    expect(response.data.data.session).not.toBeNull();
    expect(response.data.data.session).not.toBeUndefined();
  });
});
