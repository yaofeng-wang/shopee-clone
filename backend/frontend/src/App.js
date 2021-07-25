import "./App.css";
import React from "react";
import ProductList from "./components/ProductList";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import { ProvideAuth } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const App = () => {
  return (
    <Router>
      <ProvideAuth>
        <NavigationBar />
        <Container>
          <Row>
            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route path="/sign-in" component={SignIn} />
              <PrivateRoute path="/profile" component={Profile} />
            </Switch>
          </Row>
        </Container>
      </ProvideAuth>
    </Router>
  );
};

export default App;
