import { createConnection, getConnectionOptions } from "typeorm";
import { User } from "../entity/User";
import { MyList } from "../entity/MyList";

export const createTypeOrmConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  console.log("test", process.env.DATABASE_URL, process.env.REDIS_URL);
  return process.env.NODE_ENV === "production"
    ? await createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        entities: [User, MyList],
        name: "default",
        ssl: true, //required by heroku
      } as any)
    : await createConnection({ ...connectionOptions, name: "default" });
};
