import React, { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "./AuthContext";
import useFetch from "./useFetch";
import useInfiniteScroll from "./useInfiniteScroll";
import Transaction from "./Transaction";

const TransactionList = () => {
  const { djangoUserId } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, hasNextPage } = useFetch(
    `/api/user-transactions/${djangoUserId}/?page=${pageNumber}`,
    (data) =>
      setTransactions((prevProducts) => [...prevProducts, ...data.results])
  );
  const bottomBoundaryRef = useRef(null);
  const bottomBoundaryElement = (
    <div id="bottomBoundaryRef" ref={bottomBoundaryRef}></div>
  );
  useInfiniteScroll(bottomBoundaryRef, setPageNumber, isLoading, hasNextPage);

  return (
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
      {bottomBoundaryElement}
    </Container>
  );
};

export default TransactionList;
