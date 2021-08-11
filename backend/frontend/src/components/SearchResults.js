import React, { useRef, useState } from "react";
import { types } from "./Product";
import useFetch from "./useFetch";
import useInfiniteScroll from "./useInfiniteScroll";
import ProductList from "./ProductList";
import { useLocation } from "react-router-dom";
import { useCart } from "./CartContext";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const query = useQuery();
  const { isLoading, hasNextPage } = useFetch(
    `http://localhost/api/products-filter/?page=${pageNumber}&search=${query.get(
      "search"
    )}`,
    (data) =>
      setProducts((prevProducts) => {
        if (pageNumber > 1) {
          return [...prevProducts, ...data.results];
        }
        return [...data.results];
      })
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

export default SearchResults;
