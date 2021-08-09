import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Cart({ cart, removeFromCart }) {
  const [displayedItems, setDisplayedItems] = useState([]);

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
          <Col>
            <h3>Quantity: {v[1]}</h3>
            <h3>{v[0].name}</h3>
          </Col>
          <Col>
            <Button
              variant="danger"
              style={{ width: "100%" }}
              onClick={() => removeFromCart(v[0])}
            >
              Remove
            </Button>
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
        <div style={{ textAlign: "center" }}>
          <h1>No item in cart :(</h1>
        </div>
      ) : (
        <Container>
          {displayedItems}
          <Row>
            <Link to="/checkout" className="btn btn-light ml-auto">
              Checkout
            </Link>
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
