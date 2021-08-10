import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import Account from "./Account";
import TransactionList from "./TransactionList";

export default function Profile() {
  const [key, setKey] = useState("account");

  return (
    <Container className="py-3">
      <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="account" title="Account Information">
          <Account />
        </Tab>
        <Tab eventKey="transactions" title="Past Transactions">
          <TransactionList />
        </Tab>
      </Tabs>
    </Container>
  );
}
