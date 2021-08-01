import React from "react";
import { useAuth } from "./AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AddProductForm from "./AddProductForm";

export default function Profile() {
  const { user } = useAuth();

  return (
    <Container>
      <Row className="profile d-flex flex-column">
        <h1>Personal information</h1>
        <div>
          <strong>Display name</strong>: {user.displayName}{" "}
        </div>
        <div>
          <strong>Email</strong>: {user.email}{" "}
        </div>
      </Row>
      <Row className="d-flex flex-column">
        <AddProductForm />
      </Row>
    </Container>
  );
}