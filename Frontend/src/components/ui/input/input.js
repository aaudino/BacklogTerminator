import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./input.scss";

const FormInput = ({
  labelText,
  type,
  dispatcher,
  command,
  validatorRegex = /.*/,
  name,
  stateFunction,
  providedValue,
  disabler,
}) => {
  const [propValue, setPropValue] = useState(providedValue || "");

  useEffect(() => {
    handleValidation(propValue);
  }, [propValue]);

  const handleInput = (event) => {
    const inputValue = event.target.value;
    handleValidation(inputValue);
  };

  const handleValidation = (value) => {
    if (dispatcher) {
      let invalidValue = validatorRegex.test(value);
      dispatcher({
        type: command,
        payload: { value: value, invalid: !invalidValue },
      });
    }
    if (stateFunction) {
      stateFunction(value);
    }

    setPropValue(value);
  };

  return (
    <>
      {labelText && <label>{labelText}</label>}
      <input
        disabled={disabler}
        value={propValue}
        name={name}
        onChange={(event) => {
          handleInput(event);
        }}
        min={0}
        type={type}
      ></input>
    </>
  );
};

FormInput.propTypes = {};

FormInput.defaultProps = {};

export default FormInput;
