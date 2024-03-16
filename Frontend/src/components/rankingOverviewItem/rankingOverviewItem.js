import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./rankingOverviewItem.scss";
import Rating from "../ui/rating/rating";

const RankingOverviewItem = ({ index, gameEntry }) => {
  const [headerStyle, setHeaderStyle] = useState();

  useEffect(() => {
    const encodedUrl = encodeURIComponent(gameEntry.backlogItem.imageUrl);
    setHeaderStyle({
      backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 1)), url("${gameEntry.backlogItem.imageUrl}")`,
    });
  }, []);

  return (
    <div style={headerStyle} key={index} className="rankingOverviewItem">
      <h2>{index + 1}</h2>
      <img
        alt={gameEntry.backlogItem.name + ` cover image`}
        src={gameEntry.backlogItem.imageUrl}
      ></img>
      <h3>{gameEntry.backlogItem.name}</h3>
      <h4>{gameEntry.hoursToBeat}h</h4>
      <Rating rating={gameEntry.backlogItem.rating} />
    </div>
  );
};

RankingOverviewItem.propTypes = {};

RankingOverviewItem.defaultProps = {};

export default RankingOverviewItem;
