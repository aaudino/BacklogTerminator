import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../context/authContext";

function useCustomPost(url, bodyData) {
  const [data, setData] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [body, setBody] = useState(bodyData || false);

  const { user } = useContext(authContext);

  const setBodyData = (test) => {
    setBody(test);
  };

  async function postData(body) {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(body),
      };
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      setPostSuccess(true);
      setData(data);
    } catch (error) {
      setError(error.message);
      setPostSuccess(false);
    }
  }

  useEffect(() => {
    if (body) {
      postData(body);
      // Cleanup function to abort fetch if component unmounts
      return () => {
        // cleanup logic if needed
      };
    }
  }, [body]); // Dependency array ensures effect runs when url changes

  return { setBodyData, data, postSuccess, error };
}

export default useCustomPost;
