import "./App.css";
import React, { useEffect, useState } from "react";
import ProductSummaryList from "./components/ProductList";
import NavigationBar from "./components/NavigationBar";
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
import useFetch from "./components/useFetch";
import AddProductForm from "./components/AddProductForm";

const App = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);

  useFetch("http://localhost/api/products/", setProducts, setError);

  useEffect(() => {
    initFirebase();
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setLoginStatus(!!user);
        console.log(user);
      });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <Router>
      <NavigationBar loginStatus={loginStatus} />
      <Switch>
        <Route exact path="/">
          {error && <div>{error}</div>}
          {!products ? (
            <p>Loading</p>
          ) : (
            <>
              <AddProductForm />
              <ProductSummaryList products={products} />
            </>
          )}
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
};

export default App;
