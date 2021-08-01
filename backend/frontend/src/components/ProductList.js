import { useState } from "react";
import { CardDeck } from "react-bootstrap";
import Product from "./Product";
import PropTypes from "prop-types";
import useFetch from "./useFetch";

const getDisplayedProducts = (products) => {
  if (products === null) {
    return null;
  }
  const originalLength = products.length;
  const newLength = originalLength - (originalLength % 4);
  return products.slice(0, newLength);
};

const ProductList = () => {
  const [products, setProducts] = useState(null);
  const displayedProducts = getDisplayedProducts(products);

  useFetch("/api/products/", setProducts);

  return (
    <>
      {products ? (
        <div className="product-list">
          <CardDeck style={{ flexWrap: "wrap" }}>
            {displayedProducts.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </CardDeck>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;
