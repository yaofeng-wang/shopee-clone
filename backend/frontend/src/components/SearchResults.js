import React, { useRef, useState } from "react";
import { types } from "./Product";
import useFetch from "./useFetch";
import useInfiniteScroll from "./useInfiniteScroll";
import ProductList from "./ProductList";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const SearchResults = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const query = useQuery();
  const { isLoading, hasNextPage } = useFetch(
    `/api/products-filter/?page=${pageNumber}&search=${query.get("search")}`,
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

SearchResults.propTypes = {
  addToCart: PropTypes.func,
};

export default SearchResults;
