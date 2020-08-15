import React, { useState, useEffect } from "react";
import "./MyList.scss";
import axios from "axios";

const MyList: React.FunctionComponent = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      const response = await axios.get(
        process.env.REACT_APP_BACKEND_HOST as string,
        { withCredentials: true }
      );
      const { email } = response.data;
      console.log("email", email);
      const response2 = await axios.post(
        process.env.REACT_APP_BACKEND_HOST + "/get_mylist",
        { email },
        { withCredentials: true }
      );
      const shows = response2.data;
      setShows(shows);
    };
    fetchShows();
  }, []);

  const displayList = () => {
    const result = shows.map((show: any) => (
      <div className="show-container" key={show.show_id}>
        <img src={"https://image.tmdb.org/t/p/w500" + show.poster_path} />
      </div>
    ));
    return result;
  };

  //displayList().then((res) => console.log(res));
  return (
    <div className="content">
      <div className="background" style={{ backgroundColor: "#141414" }}>
        <div className="title">
          <h4>My List</h4>
        </div>
        <div className="show-list">{displayList()}</div>
      </div>
    </div>
  );
};

export default MyList;
