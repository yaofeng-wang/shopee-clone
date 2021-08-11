import React from "react";
import { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import AddProductForm from "./AddProductForm";
import ProductList from "./ProductList";
import { useAuth } from "./AuthContext";
import { types } from "./Product";
import useFetch from "./useFetch";
import useInfiniteScroll from "./useInfiniteScroll";
import fetchData from "./fetchData";

export default function Store() {
  const { djangoUserId } = useAuth();
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading } = useFetch(
    `http://localhost/api/user-products/${djangoUserId}/?page=${pageNumber}`,
    setProducts
  );
  const bottomBoundaryRef = useRef(null);
  const bottomBoundaryElement = (
    <div id="bottomBoundaryRef" ref={bottomBoundaryRef}></div>
  );
  useInfiniteScroll(bottomBoundaryRef, setPageNumber, isLoading);

  const deleteProduct = (product) => {
    fetchData(`http://localhost/api/products/${product.id}`, "DELETE");
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      return newProducts.filter((p) => {
        return p.id !== product.id;
      });
    });
  };

  const addProduct = (product) => {
    setProducts((prevProducts) => {
      return [...prevProducts, product];
    });
  };

  return (
    <Container>
      <Row className="d-flex flex-column">
        <AddProductForm addProduct={addProduct} />
      </Row>
      <Row style={{ marginTop: "10rem" }}>
        <ProductList
          products={products}
          isLoading={isLoading}
          handleOnClick={(product) => deleteProduct(product)}
          type={types.deleteProduct}
          bottomBoundaryElement={bottomBoundaryElement}
        />
      </Row>
    </Container>
  );
}
