import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "./demoButton.scss";
import Button from "../ui/button/button";
import useCustomPost from "../../hooks/useCustomPost";
import { authContext } from "../../context/authContext";

const DemoButton = () => {
  const { dispatch } = useContext(authContext);

  const { setBodyData, data, postSuccess, error } = useCustomPost(
    `${process.env.REACT_APP_API_URL}/api/user/getDemoAccess`
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBodyData({});
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));

      dispatch({ type: "LOGIN", payload: data });
    }
  }, [data]);
  return (
    <Button
      clickHandler={handleSubmit}
      style={"btn-primary--inverted"}
      btnText={"Demo"}
    />
  );
};

DemoButton.propTypes = {};

DemoButton.defaultProps = {};

export default DemoButton;
