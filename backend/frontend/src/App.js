import "./App.css";
import React, { useState } from "react";
import ProductSummaryList from "./components/ProductList";
import NavigationBar from "./components/NavigationBar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LoginPanel from "./components/LoginPanel";
import ProfilePanel from "./components/ProfilePanel";
import useFetch from "./components/useFetch";
import { ProvideAuth, useAuth } from "./components/AuthContext";

const App = () => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const auth = useAuth();

  useFetch("http://localhost/api/products/", setProducts, setError);

  return (
    <ProvideAuth>
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            {error && <div>{error}</div>}
            {!products ? (
              <p>Loading</p>
            ) : (
              <>
                <ProductSummaryList products={products} />
              </>
            )}
          </Route>
          <Route
            path="/login"
            render={() =>
              !auth?.user ? <LoginPanel /> : <Redirect to="/profile" />
            }
          ></Route>
          <Route path="/profile">
            <ProfilePanel />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
};

export default App;
