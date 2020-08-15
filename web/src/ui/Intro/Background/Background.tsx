import React from "react";
import TrialConnector from "../../Common/form-formik/";

import "./Background.scss";

interface PropTypes {
  login: boolean;
}

const Background: React.FunctionComponent<PropTypes> = ({ login }) => {
  if (login) {
    return (
      <div className="background-wrapper">
        <div className="background-image">
          <img
            src={process.env.PUBLIC_URL + "/popsignupwowweeks.jpg"}
            draggable={false}
          />
        </div>
        <div className="background-text-top">
          <h1>Unlimited movies, TV shows, and more.</h1>
          <h3>Watch anywhere. Cancel anytime.</h3>
        </div>
        <div className="background-text-bottom">
          <h6>
            Ready to watch? Enter your email to create or access your account.
          </h6>
        </div>
        <div className="try-now-form">
          <TrialConnector />
        </div>
      </div>
    );
  } else {
    return (
      <div className="background-wrapper-login">
        <div className="background-image">
          <img
            src={process.env.PUBLIC_URL + "/popsignupwowweeks.jpg"}
            draggable={false}
          />
        </div>
      </div>
    );
  }
};

export default Background;
