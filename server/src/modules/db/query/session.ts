import { User } from "../../../entity/User";
import { createMiddleware } from "../createMiddleware";
import middleware from "../middleware";

export const session = createMiddleware(
  middleware,
  async (_, __, { session }) => {
    const result = await User.findOne({ where: { id: session.userId } });
    return { email: result.email, userId: result.id };
  }
);
