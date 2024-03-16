import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./rating.scss";
import setRatingColor from "../../../utils/setRatingColor";

const Rating = ({ rating }) => {
  const [gameRatingColor, setGameRatingColor] = useState();

  useEffect(() => {
    setGameRatingColor(setRatingColor(rating));
  }, [rating]);

  return (
    <div
      style={{ backgroundColor: gameRatingColor }}
      className="ratingContainer"
    >
      <h1 className="rating">{rating}</h1>
    </div>
  );
};

Rating.propTypes = {};

Rating.defaultProps = {};

export default Rating;
