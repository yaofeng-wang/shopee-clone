import { useState, useRef } from "react";
import Product from "./Product";
import PropTypes from "prop-types";
import useFetch from "./useFetch";
import useInfiniteScroll from "./useInfiniteScroll";

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading } = useFetch(
    `http://localhost/api/products/?page=${pageNumber}`,
    setProducts
  );
  const bottomBoundaryRef = useRef(null);
  useInfiniteScroll(bottomBoundaryRef, setPageNumber, isLoading);

  return (
    <>
      {!isLoading ? (
        <div className="cards">
          {products.map((product, index) => (
            <Product key={index} product={product} addToCart={addToCart} />
          ))}
        </div>
      ) : (
        <div>Loading</div>
      )}
      <div id="bottomBoundaryRef" ref={bottomBoundaryRef}></div>
    </>
  );
};

ProductList.propTypes = {
  addToCart: PropTypes.func,
};

export default ProductList;
