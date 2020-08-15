import { Redis } from "ioredis";
import { uuid } from "uuidv4";
export const createConfirmEmailLink = async (
  userId: string,
  url: string,
  redis: Redis
) => {
  const id = uuid();
  await redis.set(id, userId, "ex", 60 * 60);
  return `${url}/confirm/${id}`;
};
