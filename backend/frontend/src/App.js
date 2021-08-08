import "./App.css";
import React from "react";
import ProductList from "./components/ProductList";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import FilteredProductList from "./components/FilteredProductList";
import { ProvideAuth } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductDetail from "./components/ProductDetail";

const App = () => {
  return (
    <Router>
      <ProvideAuth>
        <NavigationBar />
        <Container fluid className="body">
          <Row>
            <Col>
              <Container className="content min-vh-100">
                <Switch>
                  <Route exact path="/" component={ProductList} />
                  <Route path="/sign-in" component={SignIn} />
                  <Route
                    path="/products-filter/"
                    component={FilteredProductList}
                  />
                  <Route path="/products/:id" component={ProductDetail} />
                  <PrivateRoute path="/profile" component={Profile} />
                  <PrivateRoute path="/cart" component={Cart} />
                  <PrivateRoute path="/checkout" component={Checkout} />
                </Switch>
              </Container>
            </Col>
          </Row>
        </Container>
      </ProvideAuth>
    </Router>
  );
};

export default App;
