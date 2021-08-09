import { useState, useRef } from "react";
import Product from "./Product";
import PropTypes from "prop-types";
import useFetch from "./useFetch";
import useInfiniteScroll from "./useInfiniteScroll";

const ProductList = ({ url, handleOnClick, type }) => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading } = useFetch(`${url}?page=${pageNumber}`, setProducts);
  const bottomBoundaryRef = useRef(null);
  useInfiniteScroll(bottomBoundaryRef, setPageNumber, isLoading);
  const removeProduct = (product) => {
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      return newProducts.filter((p) => {
        return p.id !== product.id;
      });
    });
  };

  return (
    <>
      {!isLoading ? (
        <div className="cards">
          {products.map((product, index) => (
            <Product
              key={index}
              product={product}
              handleOnClick={handleOnClick}
              type={type}
              removeProduct={removeProduct}
            />
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
  handleOnClick: PropTypes.func,
  url: PropTypes.string,
  type: PropTypes.string,
};

export default ProductList;
