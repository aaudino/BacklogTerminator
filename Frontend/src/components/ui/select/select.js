import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import "./select.scss";
import handleBackwardCompatatiblity from "../../../utils/handleBackwardCompatatiblity";

const FormSelect = forwardRef(
  (
    {
      name,
      labelText,
      options,
      dispatcher,
      command,
      stateFunction,
      placeholder,
      key,
      providedValue,
    },
    ref
  ) => {
    const [propValue, setPropValue] = useState(
      providedValue || placeholder || ""
    );

    useEffect(() => {
      if (command === "platform_selected") {
        handleBackwardCompatatiblity(options);
      }
      handleValidation(propValue);
    }, []);

    useImperativeHandle(ref, () => ({
      propValue,
    }));

    const handleChange = (e) => {
      const selectedValue = e.target.value;
      handleValidation(selectedValue);
    };

    const handleValidation = (value) => {
      if (dispatcher) {
        let validity;
        value === placeholder || validity === ""
          ? (validity = false)
          : (validity = true);
        dispatcher({
          type: command,
          payload: { value: value, invalid: !validity },
        });
      }
      if (stateFunction) {
        stateFunction(value);
      }

      setPropValue(value);
    };

    return (
      <>
        {labelText && <label>{labelText}:</label>}

        {
          <select
            key={key}
            name={name}
            onChange={(event) => handleChange(event)}
            defaultValue={propValue}
          >
            {placeholder ? (
              <option value={placeholder} disabled>
                {placeholder}
              </option>
            ) : null}

            {Array.isArray(options)
              ? options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))
              : Object.entries(options).map(([value, text]) => (
                  <option value={value}>{text}</option>
                ))}
          </select>
        }
      </>
    );
  }
);

FormSelect.propTypes = {};

FormSelect.defaultProps = {};

export default FormSelect;
