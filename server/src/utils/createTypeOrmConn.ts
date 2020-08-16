import { createConnection, getConnectionOptions } from "typeorm";
import { User } from "../entity/User";
import { MyList } from "../entity/MyList";

export const createTypeOrmConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        entities: [User, MyList],
        name: "default",
      } as any)
    : createConnection({ ...connectionOptions, name: "default" });
};
