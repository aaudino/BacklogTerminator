import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useCustomFetch from "../hooks/useCustomFetch";
export const backlogContext = createContext(null);

export const BacklogContextProvider = ({ children }) => {
  const {
    data: backlogEntries,
    dataReady,
    setShouldFetch: setShouldFetchBacklogeEntries,
    error,
  } = useCustomFetch(
    `${process.env.REACT_APP_API_URL}/api/backlog/getBacklogEntries`
  );

  const {
    data: terminatedGames,
    dataReady: terminatedGamesDataReady,
    setShouldFetch: setShouldFetchTerminatedGames,
    error: terminatedGamesError,
  } = useCustomFetch(
    `${process.env.REACT_APP_API_URL}/api/backlog/getTerminatedGames`
  );

  const value = {
    backlogEntries,
    dataReady,
    setShouldFetchBacklogeEntries,
    terminatedGames,
    terminatedGamesDataReady,
    setShouldFetchTerminatedGames,
    terminatedGamesError,
  };
  return (
    <backlogContext.Provider value={value}>{children}</backlogContext.Provider>
  );
};

BacklogContextProvider.propTypes = {};

BacklogContextProvider.defaultProps = {};

// export default backlogContext;
