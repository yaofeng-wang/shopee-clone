import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Transaction = ({ transaction }) => {
  return (
    <Row>
      <Col>{transaction.seller_username}</Col>
      <Col>{transaction.product_name}</Col>
      <Col>S${transaction.product_price}</Col>
      <Col>{transaction.creation_datetime}</Col>
    </Row>
  );
};

Transaction.propTypes = {
  transaction: PropTypes.object,
};

export default Transaction;
