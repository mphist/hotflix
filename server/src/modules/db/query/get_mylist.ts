import { MyList } from "../../../entity/MyList";
import axios from "axios";
export const get_mylist = async (_, args, {}) => {
  console.log("get_mylist called");
  const { email } = args;
  console.log("EMAIL", email);
  const response = await MyList.find({ where: { email } });
  if (!response) {
    return null;
  }
  const showList = [];
  response.forEach((show) => {
    showList.push({
      id: show.show_id,
      title: show.show_title,
    });
  });
  //const query = (id: number) => `{
  //get_movies(id: ${id}) {
  //id
  //title
  //poster_path
  //}
  //}`;
  const query = (name: string) => `{
    get_show(name: "${name}") {
      id
      title
      poster_path
      original_name
      original_title
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
        {
          query: query(show.title || show.original_name || show.original_title),
        },
        { withCredentials: true }
      )
    );
  });
  const result = await Promise.all(promises);
  const shows = [];
  result.forEach((show) => shows.push(show.data.data.get_show));
  /* shows.forEach((show) => {
    show["show_id"] = show["id"];
    show["show_name"] = show["title"];
  }); */
  //console.log(shows);
  const combinedShows = [];
  shows.forEach((show) => combinedShows.push(...show));

  const getIndex = (id) => {
    for (let i = 0; i < combinedShows.length; i++) {
      if (Object.values(combinedShows[i]).indexOf(id) === 0) {
        return i;
      }
    }
  };

  const filteredShows = [];
  showList.forEach((show) =>
    filteredShows.push(combinedShows[getIndex(show.id)])
  );
  console.log(filteredShows);
  return filteredShows;
};
