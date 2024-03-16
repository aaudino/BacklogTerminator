import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./checkbox.scss";
import { useState } from "react";

const Checkbox = ({
  labelText,
  dispatcher,
  command,
  stateFunction,
  name,
  providedValue,
  disabler,
}) => {
  const [isChecked, setIsChecked] = useState(providedValue || false);

  const handleCheckBoxClick = (event) => {
    handleValidation(event.target.checked);
  };

  const handleValidation = (value) => {
    //ON off berücksichtigen
    if (dispatcher && command) {
      dispatcher({ type: command, payload: isChecked });
    }
    if (stateFunction) {
      stateFunction(isChecked);
    }

    setIsChecked(value);
  };

  useEffect(() => {
    handleValidation(isChecked);
  }, [isChecked]);

  return (
    <>
      <label>{labelText}</label>

      <input
        className={isChecked ? "checked" : ""}
        name={name}
        disabled={disabler}
        // value={!isChecked}
        checked={isChecked}
        onChange={(event) => {
          handleCheckBoxClick(event);
        }}
        type="checkbox"
      />
    </>
  );
};

Checkbox.propTypes = {};
Checkbox.defaultProps = {};

export default Checkbox;
