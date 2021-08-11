import React, { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import Store from "./components/Store";
import Cart from "./components/Cart";
import SearchResults from "./components/SearchResults";
import { ProvideAuth } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductDetail from "./components/ProductDetail";
import Home from "./components/Home";

const App = () => {
  const saveCartInStorage = (cart) => {
    const toBeStored = [];
    for (const [, v] of cart.entries()) {
      toBeStored.push({ ...v[0], quantity: v[1] });
    }
    if (toBeStored.length > 0) {
      sessionStorage.setItem("cart", JSON.stringify(toBeStored));
    } else if (sessionStorage.getItem("cart")) {
      sessionStorage.removeItem("cart");
    }
  };

  const loadCartFromStorage = () => {
    const toBeLoaded = new Map();
    if (!sessionStorage.getItem("cart")) {
      return toBeLoaded;
    }
    for (const obj of JSON.parse(sessionStorage.getItem("cart"))) {
      const newObj = { ...obj };
      const quantity = newObj["quantity"];
      delete newObj["quantity"];
      toBeLoaded.set(newObj.id, [newObj, quantity]);
    }
    return toBeLoaded;
  };

  const [cart, setCart] = useState(loadCartFromStorage());

  const addToCart = (newProduct) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      if (newCart.has(newProduct.id)) {
        const prevCount = newCart.get(newProduct.id)[1];
        newCart.set(newProduct.id, [newProduct, prevCount + 1]);
      } else {
        newCart.set(newProduct.id, [newProduct, 1]);
      }
      saveCartInStorage(newCart);
      return newCart;
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const newCart = new Map(prevCart);
      newCart.set(product.id, [product, newCart.get(product.id)[1] - 1]);
      if (newCart.get(product.id)[1] === 0) {
        newCart.delete(product.id);
      }
      saveCartInStorage(newCart);
      return newCart;
    });
  };

  return (
    <Router>
      <ProvideAuth>
        <NavigationBar cart={cart} />
        <Container fluid className="sc-body">
          <Row>
            <Col>
              <Container className="sc-content">
                <Switch>
                  <Route exact path="/">
                    <Home addToCart={addToCart} />
                  </Route>
                  <Route path="/sign-in" component={SignIn} />
                  <Route path="/products-filter/">
                    <SearchResults addToCart={addToCart} />
                  </Route>
                  <Route
                    path="/products/:id"
                    render={() => <ProductDetail addToCart={addToCart} />}
                  />
                  <PrivateRoute
                    path="/profile"
                    renderFunc={() => <Profile />}
                  />
                  <PrivateRoute
                    path="/store"
                    renderFunc={() => <Store addToCart={addToCart} />}
                  />
                  <PrivateRoute
                    path="/cart"
                    renderFunc={() => (
                      <Cart cart={cart} removeFromCart={removeFromCart} />
                    )}
                  />
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
