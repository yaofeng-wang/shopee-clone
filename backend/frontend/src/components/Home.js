import React, { useRef, useState } from "react";
import { types } from "./Product";
import useFetch from "./useFetch";
import useInfiniteScroll from "./useInfiniteScroll";
import ProductList from "./ProductList";
import PropTypes from "prop-types";

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, hasNextPage } = useFetch(
    `/api/products/?page=${pageNumber}`,
    (data) => setProducts((prevProducts) => [...prevProducts, ...data.results])
  );
  const bottomBoundaryRef = useRef(null);
  const bottomBoundaryElement = (
    <div id="bottomBoundaryRef" ref={bottomBoundaryRef}></div>
  );
  useInfiniteScroll(bottomBoundaryRef, setPageNumber, isLoading, hasNextPage);

  return (
    <ProductList
      products={products}
      handleOnClick={addToCart}
      type={types.addToCart}
      isLoading={isLoading}
      bottomBoundaryElement={bottomBoundaryElement}
    />
  );
};

Home.propTypes = {
  addToCart: PropTypes.func,
};

export default Home;
