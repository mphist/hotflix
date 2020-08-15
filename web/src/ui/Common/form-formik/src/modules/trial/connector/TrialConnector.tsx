import React from "react";
import TrialController from "../controller/TrialController";
import TrialView from "../ui/TrialView";

export default class TrialConnector extends React.Component {
  render() {
    return (
      <TrialController>
        {({ submit }) => <TrialView submit={submit} />}
      </TrialController>
    );
  }
}
