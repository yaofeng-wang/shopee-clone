import React from "react";
import { useAuth } from "./AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Account = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Row>
        <Col sm={3}>
          <strong>Username</strong>:
        </Col>
        <Col>{user.displayName}</Col>
      </Row>
      <Row>
        <Col sm={3}>
          <strong>Email</strong>:
        </Col>
        <Col>{user.email}</Col>
      </Row>
    </Container>
  );
};

export default Account;
