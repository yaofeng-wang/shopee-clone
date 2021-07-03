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
import { initFirebase } from "./components/FirebaseAuth";

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
    initFirebase();
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
            !loginStatus ? <LoginPanel /> : <Redirect to="/profile" />
          }
        ></Route>
        <Route path="/profile">
          <ProfilePanel />
        </Route>
      </Switch>
    </Router>
  );
}
