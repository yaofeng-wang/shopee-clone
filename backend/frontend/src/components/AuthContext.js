import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import PropTypes from "prop-types";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useHistory } from "react-router-dom";

const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

firebase.initializeApp({
  // eslint-disable-next-line no-undef
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // eslint-disable-next-line no-undef
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // eslint-disable-next-line no-undef
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // eslint-disable-next-line no-undef
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // eslint-disable-next-line no-undef
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // eslint-disable-next-line no-undef
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const [djangoUserId, setDjangoUserId] = useState(null);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const signInButton = (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );

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
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const csrftoken = getCookie("csrftoken");
        await fetch("/api/user-id/", {
          method: "POST",
          body: JSON.stringify({
            username: user.displayName,
            email: user.email,
          }),
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setDjangoUserId(data);
          })
          .catch((err) => {
            console.log(err);
          });
        history.push("/");
      } else {
        setUser(false);
        setDjangoUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signout,
    signInButton,
    djangoUserId,
  };
}

ProvideAuth.propTypes = {
  children: PropTypes.any,
};
