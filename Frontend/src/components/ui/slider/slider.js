import React, { useState } from "react";
import PropTypes from "prop-types";
import "./slider.scss";

const Slider = ({ items, stateFunction, selectedItem }) => {
  const [activeElementIndex, setactiveElementIndex] = useState(
    selectedItem | 0
  );

  const handleClick = (index, item) => {
    setactiveElementIndex(index);
    stateFunction(item);
  };

  return (
    <div className="slider">
      <div className="sliderContainer">
        {items.map((item, index) => (
          <p
            onClick={() => handleClick(index, item)}
            className={
              index === activeElementIndex
                ? "sliderItem sliderItem--active"
                : "sliderItem"
            }
            key={index}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

Slider.propTypes = {};

Slider.defaultProps = {};

export default Slider;
