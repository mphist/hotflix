import React, { FunctionComponent } from "react";
import { useQuery } from "@apollo/react-hooks";
import Slider from "react-slick";
import {
  TRENDING,
  TV,
  MOVIES,
  ANIMATION,
  NEW_MOVIES,
  TV_ACTION,
  TV_CRIME,
  TV_DOCUMENTARY,
} from "./GraphQLSchema";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Card.scss";
import axios from "axios";

interface Props {
  category: string;
  text: string;
}

const Card: FunctionComponent<Props> = (props: Props) => {
  let category = TRENDING;
  if (props.category === "tv") {
    category = TV;
  } else if (props.category === "movies") {
    category = MOVIES;
  } else if (props.category === "animation") {
    category = ANIMATION;
  } else if (props.category === "new_movies") {
    category = NEW_MOVIES;
  } else if (props.category === "tv_action") {
    category = TV_ACTION;
  } else if (props.category === "tv_crime") {
    category = TV_CRIME;
  } else if (props.category === "tv_documentary") {
    category = TV_DOCUMENTARY;
  }

  const { loading, error, data } = useQuery(category);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const settings = {
    dots: false,
    draggable: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    infinite: true,
  };

  const host =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_BACKEND_HOST_PROD
      : process.env.REACT_APP_BACKEND_HOST_DEV;

  const handleAddToList = async (id: number, title: string) => {
    try {
      const response = await axios.get(host as string, {
        withCredentials: true,
      });
      const email = response.data.email;
      if (email) {
        const result = await axios.post(
          host + "/add_to_mylist",
          { id, title, email },
          { withCredentials: true }
        );
        alert(result.data.data.add_to_mylist.message);
      }
    } catch (err) {
      alert(`Error!! ${err}`);
    }
  };

  return (
    <div className="contents-card-wrapper">
      <div className="trending-card-row">
        <div className="card-text">
          <h3>{props.text}</h3>
        </div>
        <div className="card-images">
          <Slider {...settings}>
            {data.results.map((show: any) => {
              return (
                <div className="image-container" key={show.id}>
                  <img
                    className="image"
                    src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                  />

                  <div className="add-to-list-btn">
                    <div className="add-text-container">
                      <span className="add-text">Add To My List</span>
                    </div>
                    <svg
                      className="add-btn"
                      version="1.1"
                      id="Layer_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                      fill="white"
                      onClick={() => handleAddToList(show.id, show.title)}
                    >
                      <g>
                        <g>
                          <path
                            d="M256,0C114.51,0,0,114.497,0,256c0,141.49,114.497,256,256,256c141.49,0,256-114.497,256-256C512,114.51,397.503,0,256,0z
			 M256,477.867c-122.337,0-221.867-99.529-221.867-221.867S133.663,34.133,256,34.133S477.867,133.663,477.867,256
			S378.337,477.867,256,477.867z"
                          />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M371.345,238.933h-98.278v-98.278c0-9.425-7.641-17.067-17.067-17.067s-17.067,7.641-17.067,17.067v98.278h-98.278
			c-9.425,0-17.067,7.641-17.067,17.067s7.641,17.067,17.067,17.067h98.278v98.278c0,9.425,7.641,17.067,17.067,17.067
			s17.067-7.641,17.067-17.067v-98.278h98.278c9.425,0,17.067-7.641,17.067-17.067S380.77,238.933,371.345,238.933z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Card;
