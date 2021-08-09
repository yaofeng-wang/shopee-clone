import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AddProductForm from "./AddProductForm";
import ProductList from "./ProductList";
import { useAuth } from "./AuthContext";
import { types } from "./Product";

export default function Store() {
  const { djangoUserId } = useAuth();

  const deleteProduct = (product) => {
    fetch(`http://localhost/api/products/${product.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row className="d-flex flex-column">
        <AddProductForm />
      </Row>
      <Row>
        <ProductList
          url={`http://localhost/api/user-products/${djangoUserId}`}
          handleOnClick={deleteProduct}
          type={types.deleteProduct}
        />
      </Row>
    </Container>
  );
}
