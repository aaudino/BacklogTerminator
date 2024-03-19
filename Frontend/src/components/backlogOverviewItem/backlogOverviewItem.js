import React, { useState } from "react";
import PropTypes from "prop-types";
import { backlogContext } from "../../context/backlogContext";
import "./backlogOverviewItem.scss";

import { useContext } from "react";

import Rating from "../ui/rating/rating";
import Modal from "../modal/modal";
import GameForm from "../gameForm/gameForm";

const BacklogOverviewItem = ({ backlogEntry, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (gameEntry) => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        key={index}
        className="backlogItem"
        onClick={(e) => openModal(backlogEntry)}
      >
        <img
          alt={backlogEntry.backlogItem.name + `cover image`}
          src={backlogEntry.backlogItem.imageUrl}
        ></img>
        <h3>{backlogEntry.backlogItem.name}</h3>
        <div className="ratingComponent">
          <Rating rating={backlogEntry.backlogItem.rating} />
        </div>

        <div className="playtime">
          <h4>{backlogEntry.playstyleSelect}:</h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
            width="15"
            height="15"
            stroke="#5c16c5"
          >
            <path
              d="M145.61 464h220.78c19.8 0 35.55-16.29 33.42-35.06C386.06 308 304 310 304 256s83.11-51 95.8-172.94c2-18.78-13.61-35.06-33.41-35.06H145.61c-19.8 0-35.37 16.28-33.41 35.06C124.89 205 208 201 208 256s-82.06 52-95.8 172.94c-2.14 18.77 13.61 35.06 33.41 35.06z"
              fill="none"
              stroke="#5c16c5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
            <path
              fill="#5c16c5"
              d="M343.3 432H169.13c-15.6 0-20-18-9.06-29.16C186.55 376 240 356.78 240 326V224c0-19.85-38-35-61.51-67.2-3.88-5.31-3.49-12.8 6.37-12.8h142.73c8.41 0 10.23 7.43 6.4 12.75C310.82 189 272 204.05 272 224v102c0 30.53 55.71 47 80.4 76.87 9.95 12.04 6.47 29.13-9.1 29.13z"
            />
          </svg>
          <h4>
            {
              backlogEntry.backlogItem.gameplayStyles[
                backlogEntry.playstyleSelect
              ]
            }
          </h4>
        </div>
        {backlogEntry.alreadyPlayedCB && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
            width="20"
            height="20"
          >
            <path
              d="M467.51 248.83c-18.4-83.18-45.69-136.24-89.43-149.17A91.5 91.5 0 00352 96c-26.89 0-48.11 16-96 16s-69.15-16-96-16a99.09 99.09 0 00-27.2 3.66C89 112.59 61.94 165.7 43.33 248.83c-19 84.91-15.56 152 21.58 164.88 26 9 49.25-9.61 71.27-37 25-31.2 55.79-40.8 119.82-40.8s93.62 9.6 118.66 40.8c22 27.41 46.11 45.79 71.42 37.16 41.02-14.01 40.44-79.13 21.43-165.04z"
              fill="none"
              stroke="#5c16c5"
              strokeMiterlimit="10"
              strokeWidth="32"
            />
            <circle fill="#5c16c5" stroke="#5c16c5" cx="292" cy="224" r="20" />
            <path
              fill="#5c16c5"
              d="M336 288a20 20 0 1120-19.95A20 20 0 01336 288z"
            />
            <circle fill="#5c16c5" stroke="#5c16c5" cx="336" cy="180" r="20" />
            <circle fill="#5c16c5" cx="380" cy="224" r="20" />
            <path
              fill="#5c16c5"
              stroke="#5c16c5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M160 176v96M208 224h-96"
            />
          </svg>
        )}
        <span className="platform">{backlogEntry.platformSelect}</span>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <GameForm
            saveUrl={`${process.env.REACT_APP_API_URL}/api/backlog/addBacklogGame`}
            deleteUrl={`${process.env.REACT_APP_API_URL}/api/backlog/deleteBacklogGame`}
            gameEntry={backlogEntry.backlogItem}
            userData={{ ...backlogEntry, backlogItem: undefined }}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      )}
    </>
  );
};

BacklogOverviewItem.propTypes = {};

BacklogOverviewItem.defaultProps = {};

export default BacklogOverviewItem;
