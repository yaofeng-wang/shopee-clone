import { useEffect, useState } from "react";

const useFetch = (url, setData) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
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
        isLoading(false);
      });
    return () => abortCont.abort();
  }, [url]);

  return {
    error,
    isLoading,
  };
};

export default useFetch;
