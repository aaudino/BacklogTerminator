import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./gameFormHeader.scss";
import Genres from "../ui/genres/genres";
import Rating from "../ui/rating/rating";

const GameFormHeader = ({ game }) => {
  const headerStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(224, 224, 224, 0.55), rgba(255, 255, 255, 1)), url(${game.imageUrl})`,
  };
  return (
    <div style={headerStyle} className="GameFormHeader">
      <h1>{game.name}</h1>
      <img src={game.imageUrl} alt="" />
      <div className="hoursToBeat">
        {Object.entries(game.gameplayStyles).map(([key, value]) => {
          return (
            <p key={key}>
              {key} : {value}h
            </p>
          );
        })}
      </div>
      <Genres genres={game.genre} />
      <Rating rating={game.rating} />
    </div>
  );
};

GameFormHeader.propTypes = {};

GameFormHeader.defaultProps = {};

export default GameFormHeader;
