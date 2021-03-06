import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useAuth } from "./AuthContext";
import fetchData from "./fetchData";
import { useCart } from "./CartContext";

export const Cart = () => {
  const [displayedItems, setDisplayedItems] = useState([]);
  const { djangoUserId } = useAuth();
  const { cart, removeFromCart } = useCart();

  const handleCheckout = (cart) => {
    cart.forEach((value) => {
      for (let i = 0; i < value[1]; i++) {
        const data = JSON.stringify({
          seller: value[0].seller,
          product: value[0].id,
          buyer: djangoUserId,
        });
        fetchData(
          "http://localhost/api/transactions/",
          "POST",
          () => removeFromCart(value[0]),
          data,
          { "Content-Type": "application/json" }
        );
      }
    });
  };

  useEffect(() => {
    for (const [k, v] of cart[Symbol.iterator]()) {
      const newItem = (
        <Row
          key={k}
          style={{
            padding: "1rem",
            border: "1px solid black",
            height: "20rem",
          }}
        >
          <Col sm={3}>
            <img
              variant="left"
              src={v[0].image}
              style={{ width: "100%", height: "18rem" }}
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
};

export default Cart;
