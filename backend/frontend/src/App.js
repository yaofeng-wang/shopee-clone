import "./App.css";
import React, { useEffect, useState } from "react";
import ProductSummaryList from "./components/ProductList.js";
import NavigationBar from "./components/NavigationBar.js";
import firebase from "firebase";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginPanel from "./components/LoginPanel";
import ProfilePanel from "./components/ProfilePanel";

const firebaseConfig = {
  apiKey: "AIzaSyCDFyPk6pnFJHu7diGyC1EwlSA31_QOz8w",
  authDomain: "shopee-clone-19ea7.firebaseapp.com",
  projectId: "shopee-clone-19ea7",
  storageBucket: "shopee-clone-19ea7.appspot.com",
  messagingSenderId: "808288829465",
  appId: "1:808288829465:web:2c41bc555f27694a2fea88",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    fetch("http://localhost/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setLoginStatus(!!user);
      });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <Router>
      <NavigationBar loginStatus={loginStatus} />
      <Switch>
        <Route exact path="/">
          <ProductSummaryList products={products} />
        </Route>
        <Route
          path="/login"
          render={() =>
            !loginStatus ? (
              <LoginPanel loginStatus={loginStatus} />
            ) : (
              <Redirect to="/profile" />
            )
          }
        ></Route>
        <Route path="/profile">
          <ProfilePanel />
        </Route>
      </Switch>
    </Router>
  );
}
