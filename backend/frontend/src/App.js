import "./App.css";
import React from "react";
import ProductList from "./components/ProductList";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/SignIn";
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
          <Route path="/sign-in" component={SignIn} />
          <PrivateRoute path="/profile" component={ProfilePanel} />
        </Switch>
      </Router>
    </ProvideAuth>
  );
};

export default App;
