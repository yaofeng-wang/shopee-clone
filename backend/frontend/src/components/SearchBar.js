import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default function SearchBar() {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("Search");

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/products-filter/?search=${searchQuery}`);
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex">
      <FormControl
        type="search"
        value={searchQuery}
        onFocus={() => setSearchQuery("")}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button type="submit" variant="light">
        Search
      </Button>
    </Form>
  );
}
