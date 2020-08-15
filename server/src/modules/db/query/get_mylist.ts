import { MyList } from "../../../entity/MyList";
import axios from "axios";
export const get_mylist = async (_, args, {}) => {
  const { email } = args;
  const response = await MyList.find({ where: { email } });
  const showList = [];
  response.forEach((show) =>
    showList.push({ show_id: show.show_id, show_name: show.show_name })
  );
  const query = (id: number) => `{
    get_movies(id: ${id}) {
      id
      title
      poster_path
    }
  }`;

  const host =
    process.env.NODE_ENV === "production"
      ? process.env.GRAPHQL_HOST_PROD
      : process.env.GRAPHQL_HOST_DEV;

  const promises = [];
  showList.forEach((show) => {
    promises.push(
      axios.post(
        host,
        { query: query(show.show_id) },
        { withCredentials: true }
      )
    );
  });
  const result = await Promise.all(promises);
  const shows = [];
  result.forEach((show) => shows.push(show.data.data.get_movies));
  shows.forEach((show) => {
    show["show_id"] = show["id"];
    show["show_name"] = show["title"];
  });
  console.log(shows);
  return shows;
};
