import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./progressbar.scss";
import setRatingColor from "../../../utils/setRatingColor";

const Progressbar = ({ referenceObject, object }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const total = referenceObject.length + object.length;
    const percentageValue = `${Math.ceil((object.length / total) * 100) || 0}%`;
    setPercentage(percentageValue);
  }, [object, referenceObject]);
  return (
    <div className="progressbar">
      <div
        style={{
          width: percentage,
          backgroundColor: setRatingColor(parseInt(percentage)),
        }}
        className="progress"
      ></div>
      <p className="percentage">{percentage}</p>
    </div>
  );
};

Progressbar.propTypes = {};

Progressbar.defaultProps = {};

export default Progressbar;
