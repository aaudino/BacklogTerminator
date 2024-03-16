import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import "./navbar.scss";
import { Link } from "react-router-dom";
import Backlog from "../../Pages/backlog/backlog";
import { authContext } from "../../context/authContext";
import Button from "../ui/button/button";
import DemoButton from "../demoButton/demoButton";

const Navbar = () => {
  const { user, dispatch } = useContext(authContext);
  return (
    <div className="Navbar">
      <nav>
        <div className="navbarContainer">
          <ul className="linksContainer ">
            {user && (
              <>
                <li>
                  <Link className="links" to="/backlog">
                    Backlog
                  </Link>
                </li>
                <li>
                  <Link className="links" to="/ranking">
                    Ranking
                  </Link>
                </li>
              </>
            )}
            {!user && <DemoButton />}
          </ul>
          <div>
            <span className="testLogo1">Backlog</span>
            <span className="testLogo">Terminator</span>
          </div>
          <ul className="userLinksContainer">
            {!user && (
              <>
                <li>
                  <Link className="btn-primary--inverted" to="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="btn-primary--inverted" to="/sign-up">
                    Signup
                  </Link>
                </li>
              </>
            )}

            {user && (
              <>
                <p>Hello, {user.userName}</p>
                <button
                  className="btn-primary--inverted"
                  onClick={(e) => dispatch({ type: "LOGOUT", payload: "" })}
                >
                  Logout
                </button>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
