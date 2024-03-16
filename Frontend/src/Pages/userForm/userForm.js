import React, { useEffect, useRef, useState, useContext } from "react";
import PropTypes from "prop-types";

import "./userForm.scss";
import FormInput from "../../components/ui/input/input";
import Button from "../../components/ui/button/button";
import useCustomPost from "../../hooks/useCustomPost";
import { authContext } from "../../context/authContext";

const UserForm = ({ header = "", postUrl, contextType }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(authContext);

  const { setBodyData, data, postSuccess, error } = useCustomPost(postUrl);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBodyData({ userName: userName, password: password });
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));

      dispatch({ type: contextType, payload: data });
    }
  }, [data]);

  return (
    <div className="UserForm">
      <div className="userFormContainer">
        <h1>{header}</h1>
        <form onSubmit={handleSubmit} className="userFormContainer--form">
          <FormInput
            stateFunction={setUsername}
            labelText={"Username:"}
            type={"text"}
          />
          <FormInput
            stateFunction={setPassword}
            labelText={"Password:"}
            type={"password"}
          />
          <Button type={"submit"} btnText={header}></Button>
          <p>{error}</p>
        </form>
      </div>
    </div>
  );
};

UserForm.propTypes = {};

UserForm.defaultProps = {};

export default UserForm;
