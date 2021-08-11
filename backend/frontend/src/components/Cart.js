import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useAuth } from "./AuthContext";

export default function Cart({ cart, removeFromCart }) {
  const [displayedItems, setDisplayedItems] = useState([]);
  const { djangoUserId } = useAuth();

  const handleCheckout = (cart) => {
    cart.forEach((value) => {
      const data = JSON.stringify({
        seller: value[0].seller,
        product: value[0].id,
        buyer: djangoUserId,
      });
      fetch("http://localhost/api/transactions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      })
        .then(() => {
          removeFromCart(value[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  useEffect(() => {
    for (const [k, v] of cart[Symbol.iterator]()) {
      const newItem = (
        <Row key={k} style={{ border: "1px solid black" }}>
          <Col sm={3}>
            <img
              variant="left"
              src={v[0].image}
              style={{ width: "100%" }}
            ></img>
          </Col>
          <Col
            className="d-flex flex-column"
            style={{ justifyContent: "center" }}
          >
            <Row>Name: {v[0].name}</Row>
            <Row>Quantity: {v[1]}</Row>
          </Col>
          <Col
            className="d-flex flex-column"
            style={{ justifyContent: "center" }}
          >
            <Row>
              <Button
                variant="danger"
                style={{ width: "100%" }}
                onClick={() => removeFromCart(v[0])}
              >
                Remove
              </Button>
            </Row>
          </Col>
        </Row>
      );
      setDisplayedItems((prev) => {
        return [...prev, newItem];
      });
    }

    return () => setDisplayedItems([]);
  }, [cart]);

  return (
    <>
      {cart.size == 0 ? (
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            height: "85vh",
            flexDirection: "column",
          }}
        >
          <h1>No item in cart</h1>
        </div>
      ) : (
        <Container>
          {displayedItems}
          <Row>
            <Button
              onClick={() => handleCheckout(cart)}
              className="btn btn-light"
            >
              Checkout
            </Button>
          </Row>
        </Container>
      )}
    </>
  );
}

Cart.propTypes = {
  cart: PropTypes.object,
  removeFromCart: PropTypes.func,
};
