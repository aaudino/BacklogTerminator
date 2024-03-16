import React from "react";
import PropTypes from "prop-types";
import "./counter.scss";

const Counter = ({ itemsToCount, statement }) => {
  return (
    <h3>
      {itemsToCount} {statement}
    </h3>
  );
};

Counter.propTypes = {};

Counter.defaultProps = {};

export default Counter;
