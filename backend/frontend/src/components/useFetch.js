import { useEffect, useState } from "react";

const useFetch = (url, successCallback) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(async () => {
    const abortCont = new AbortController();

    setIsLoading(true);
    setHasNextPage(false);
    await fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        successCallback(data);
        setHasNextPage(data.next !== null);
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
    hasNextPage,
  };
};

export default useFetch;
