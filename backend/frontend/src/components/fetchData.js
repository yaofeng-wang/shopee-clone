const fetchData = (url, method, fetchSuccessFunc, body, headers = {}) => {
  let error = null;
  let isLoading = true;

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

  fetch(url, {
    method: method,
    body: body,
    headers: {
      ...headers,
      "X-CSRFToken": getCookie("csrftoken"),
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw Error("could not fetch the data for that resource");
      }
      return res.json();
    })
    .then((data) => {
      fetchSuccessFunc(data);
      isLoading = false;
    })
    .catch((err) => {
      error = err;
      isLoading = false;
    });

  return {
    error,
    isLoading,
  };
};

export default fetchData;
