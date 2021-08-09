import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AddProductForm from "./AddProductForm";

export default function Store() {
  return (
    <Container>
      <Row className="d-flex flex-column">
        <AddProductForm />
      </Row>
    </Container>
  );
}
