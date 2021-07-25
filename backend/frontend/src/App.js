import "./App.css";
import React from "react";
import ProductList from "./components/ProductList";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPanel from "./components/LoginPanel";
import ProfilePanel from "./components/ProfilePanel";
import { ProvideAuth } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <ProvideAuth>
      <Router>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/login" component={LoginPanel} />
          <PrivateRoute path="/profile" component={ProfilePanel} />
        </Switch>
      </Router>
    </ProvideAuth>
  );
};

export default App;
