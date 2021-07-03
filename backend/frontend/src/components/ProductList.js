import { CardDeck } from "react-bootstrap";
import Product from "./Product";
import PropTypes from "prop-types";

const getDisplayedProducts = (products) => {
  const originalLength = products.length;
  const newLength = originalLength - (originalLength % 4);
  return products.slice(0, newLength);
};

const ProductList = ({ products }) => {
  const displayedProducts = getDisplayedProducts(products);

  return (
    <div className="product-list">
      <CardDeck style={{ flexWrap: "wrap" }}>
        {displayedProducts.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </CardDeck>
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;
