import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "./AuthContext";
import useFetch from "./useFetch";
import Transaction from "./Transaction";

export default function TransactionList() {
  const { djangoUserId } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [pageNumber] = useState(1);
  const { isLoading } = useFetch(
    `http://localhost/api/user-transactions/${djangoUserId}/?page=${pageNumber}`,
    setTransactions
  );

  return isLoading ? (
    <Container>
      <Row>
        <Col>Loading</Col>
      </Row>
    </Container>
  ) : (
    <Container>
      <Row>
        <Col>
          <strong>Seller Username</strong>
        </Col>
        <Col>
          <strong>Product Name</strong>
        </Col>
        <Col>
          <strong>Product Price</strong>
        </Col>
        <Col>
          <strong>Transaction Datetime</strong>
        </Col>
      </Row>
      {transactions.map((transaction, index) => (
        <Transaction key={index} transaction={transaction} />
      ))}
    </Container>
  );
}
