import React from "react";
import { useAuth } from "./AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default function Profile() {
  const { user } = useAuth();

  return (
    <Container>
      <Row className="d-flex flex-column">
        <h1>Personal Information</h1>
        <div>
          <strong>Display name</strong>: {user.displayName}{" "}
        </div>
        <div>
          <strong>Email</strong>: {user.email}{" "}
        </div>
      </Row>
    </Container>
  );
}
