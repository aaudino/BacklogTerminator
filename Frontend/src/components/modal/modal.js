import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "./modal.scss";

const Modal = ({ setIsModalOpen, children }) => {
  return (
    <div className="modalWindow">
      <div className="modal">
        <div className="close" onClick={(e) => setIsModalOpen(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
            height="30px"
          >
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              fill="none"
              stroke="#5c16c5"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <path
              fill="none"
              stroke="#5c16c5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M320 320L192 192M192 320l128-128"
            />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {};

Modal.defaultProps = {};

export default Modal;
