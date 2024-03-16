import React from "react";
import PropTypes from "prop-types";
import Searchbar from "../../components/searchbar/searchbar";
import BacklogOverview from "../../components/backlogOverview/backlogOverview";
import "./backlog.scss";
import {
  backlogContext,
  BacklogContextProvider,
} from "../../context/backlogContext";

const Backlog = () => {
  return (
    <BacklogContextProvider>
      <div className="Backlog">
        <div className="container">
          <Searchbar />
          <BacklogOverview></BacklogOverview>
        </div>
      </div>
    </BacklogContextProvider>
  );
};

Backlog.propTypes = {};

Backlog.defaultProps = {};

export default Backlog;
