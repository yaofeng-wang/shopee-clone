import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import PropTypes from "prop-types";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

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

  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => true,
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

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signout,
    signInButton,
  };
}

ProvideAuth.propTypes = {
  children: PropTypes.object,
};
