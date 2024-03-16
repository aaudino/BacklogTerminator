import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../context/authContext";

function useCustomFetch(url, shouldFetchInitially = true) {
  const [data, setData] = useState(null);
  const [dataReady, setDataReady] = useState(false);
  const [error, setError] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(shouldFetchInitially);
  const [params, setParams] = useState("");

  const { user } = useContext(authContext);

  const fetchData = async () => {
    setDataReady(false);
    try {
      if (params) {
        url += `?${new URLSearchParams(params).toString()}`;
      }
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to Fetch");
      }

      const jsonData = await response.json();
      setData(jsonData);
      setDataReady(true);
    } catch (error) {
      console.log(error);
      setError(error);
      setDataReady(false);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
      setShouldFetch(false);
    }
    // Cleanup function to abort fetch if component unmounts
    return () => {
      // cleanup logic if needed
    };
  }, [shouldFetch, url]); // Dependency array ensures effect runs when url changes

  const setFetchParams = (newParams) => {
    setParams(newParams);
  };

  return { data, dataReady, setFetchParams, setShouldFetch, error };
}

export default useCustomFetch;
