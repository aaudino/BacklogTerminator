import React from "react";
import PropTypes from "prop-types";
import "./ranking.scss";
import { BacklogContextProvider } from "../../context/backlogContext";
import RankingOverview from "../../components/rankingOverview/rankingOverview";

const Ranking = () => {
  return (
    <BacklogContextProvider>
      <div className="Ranking">
        <div className="ranking-heading">
          <h2>The Backlog Terminator Algorithm Presents:</h2>
          <h1>Your Ultimate Gaming Playlist To Tackle Your Backlog!</h1>
        </div>

        <RankingOverview />
      </div>
    </BacklogContextProvider>
  );
};

Ranking.propTypes = {};

Ranking.defaultProps = {};

export default Ranking;
