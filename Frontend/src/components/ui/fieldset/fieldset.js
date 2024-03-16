import React, { children } from "react";
import PropTypes from "prop-types";
import "./fieldset.scss";

const Fieldset = ({ legendText, text, children }) => {
  return (
    <fieldset>
      <legend>{legendText}</legend>
      {text ? <p>{text}</p> : children}
    </fieldset>
  );
};

Fieldset.propTypes = {};

Fieldset.defaultProps = {};

export default Fieldset;
