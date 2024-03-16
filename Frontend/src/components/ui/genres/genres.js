import React from "react";
import PropTypes from "prop-types";
import "./genres.scss";

const Genres = ({ genres }) => {
  return (
    <div className="genres">
      {genres.map((genreItem, index) => (
        <span className="genreItem" key={index}>
          {genreItem}
        </span>
      ))}
    </div>
  );
};

Genres.propTypes = {};

Genres.defaultProps = {};

export default Genres;
