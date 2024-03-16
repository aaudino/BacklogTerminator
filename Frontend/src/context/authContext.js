import React, { useReducer, createContext, useEffect } from "react";
import PropTypes from "prop-types";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { user: action.payload };
        break;
      case "LOGOUT":
        localStorage.removeItem("user");
        return { user: null };

      default:
        return state;
        break;
    }
  };

  const [state, dispatch] = useReducer(authReducer, {
    user: JSON.parse(localStorage.getItem("user")) || null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <authContext.Provider value={{ dispatch, ...state }}>
      {children}
    </authContext.Provider>
  );
};

AuthContextProvider.propTypes = {};

AuthContextProvider.defaultProps = {};

// export default AuthContextProvider;
