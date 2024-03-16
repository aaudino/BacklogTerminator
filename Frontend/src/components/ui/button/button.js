import React from "react";
import PropTypes from "prop-types";
import "./button.scss";

const Button = ({ disabler, btnText, type, clickHandler, style }) => {
  clickHandler ? (type = "button") : (type = type);
  return (
    <button
      onClick={clickHandler}
      className={style || "btn-primary"}
      disabled={disabler}
      type={type}
    >
      {btnText}
    </button>
  );
};

Button.propTypes = {};

Button.defaultProps = {};

export default Button;
