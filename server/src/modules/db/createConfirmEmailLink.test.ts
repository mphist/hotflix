import Redis from "ioredis";
import { createConfirmEmailLink } from "../../utils/createConfirmEmailLink";
import { User } from "../../entity/User";
import { createTypeOrmConn } from "../../utils/createTypeOrmConn";
import fetch from "node-fetch";

let userId;

beforeAll(async () => {
  await createTypeOrmConn();
  const user = await User.create({
    email: "test-confirmation-email@test.test",
    phone: "",
    password: "testtest",
  }).save();

  userId = user.id;
});

describe("Make sure createConfirmEmailLink is working", () => {
  const redis = new Redis();
  const url = "http://localhost:4000";
  let link: string;

  it("Make sure link is created and when clicked on it, server sends ok", async () => {
    link = await createConfirmEmailLink(userId, url, redis);
    const response = await (await fetch(link)).text();
    expect(response).toEqual("ok");
  });

  it("Confirmed flag should be updated to true in DB", async () => {
    const user = await User.findOne({ where: { id: userId } });
    expect(user.confirmed).toBeTruthy();
  });

  it("User should be removed from Redis", async () => {
    const linkArr = link.split("/");
    const id = linkArr[linkArr.length - 1];
    const redis_id = await redis.get(id);
    expect(redis_id).toBeNull();
  });

  it("Bad id should get rejected", async () => {
    const response = await (await fetch(url + "/confirm/182903")).text();
    expect(response).toEqual("invalid user id");
  });
});
