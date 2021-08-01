import { useEffect, useState } from "react";

const useFetch = (url, setData) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const getCookie = (name) => {
    if (!document.cookie) {
      return null;
    }
    const token = document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((c) => c.startsWith(name + "="));

    if (token.length === 0) {
      return null;
    }
    return decodeURIComponent(token[0].split("=")[1]);
  };

  useEffect(() => {
    const abortCont = new AbortController();
    const csrftoken = getCookie("csrftoken");
    fetch(url, {
      signal: abortCont.signal,
      headers: {
        "X-CSRFToken": csrftoken,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
    return () => abortCont.abort();
  }, [url]);

  return {
    error,
    isLoading,
  };
};

export default useFetch;
