import React, { useState, useReducer, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "./searchbar.scss";
import Modal from "../modal/modal";
import GameEntryForm from "../gameEntryForm/gameEntryForm";
import useCustomFetch from "../../hooks/useCustomFetch";
import useDebounce from "../../hooks/useDebounce";
import Input from "../ui/input/input";
import GameForm from "../gameForm/gameForm";

const Searchbar = (props) => {
  const [query, setQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameEntry, setGameEntry] = useState();
  const debouncedSearch = useDebounce(query);

  const {
    data: gameData,
    dataReady,
    setFetchParams,
    setShouldFetch,
    error,
  } = useCustomFetch(`${process.env.REACT_APP_API_URL}/api/getData`, false);

  const {
    data: queryResults,
    dataReady: queryResultsReady,
    setFetchParams: setQueryResultsParams,
    setShouldFetch: setShouldFetchQueryResults,
    error: queryResultsError,
  } = useCustomFetch(`${process.env.REACT_APP_API_URL}/api/getGame`, false);

  useEffect(() => {
    if (gameData) {
      gameEntry.description = gameData.description;
      gameEntry.genre = gameData.genre;
      setIsModalOpen(true);
      setGameEntry(gameEntry);
    }
  }, [gameData]);

  useEffect(() => {
    if (debouncedSearch.length > 1) {
      setQueryResultsParams(new URLSearchParams({ game: debouncedSearch }));
      setShouldFetchQueryResults(true);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [debouncedSearch]);

  const openModal = async function (index) {
    setShowSearchResults(false);
    const entry = queryResults[index];
    setFetchParams(new URLSearchParams({ id: entry.id }));
    setShouldFetch(true);
    setGameEntry(entry);
  };

  return (
    <>
      <div className="Searchbar">
        <Input stateFunction={setQuery} type={"text"} />
        {showSearchResults && (
          <div className="searchResultsContainer" tabIndex={1}>
            {!queryResultsReady && <p className="status">...Loading</p>}

            {queryResultsReady && queryResults.length === 0 && (
              <p className="status">WOW such empty</p>
            )}
            {queryResultsReady &&
              queryResults.length > 0 &&
              queryResults.map((entry, index) => {
                return (
                  <div
                    onClick={() => openModal(index)}
                    key={index}
                    className="searchResultsContainerEntry"
                  >
                    <img src={entry.imageUrl} alt={entry.name} />
                    <h4>{entry.name}</h4>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <GameForm
            saveUrl={`${process.env.REACT_APP_API_URL}/api/backlog/addBacklogGame`}
            deleteUrl={`${process.env.REACT_APP_API_URL}/api/backlog/deleteBacklogGame`}
            gameEntry={gameEntry}
            setIsModalOpen={setIsModalOpen}
          />
        </Modal>
      )}
    </>
  );
};

Searchbar.propTypes = {};

Searchbar.defaultProps = {};

export default Searchbar;
