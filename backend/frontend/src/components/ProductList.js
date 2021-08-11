import Product from "./Product";
import PropTypes from "prop-types";

const ProductList = ({
  products,
  handleOnClick,
  type,
  isLoading,
  bottomBoundaryElement,
}) => {
  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="cards sc-cards">
          {products.map((product, index) => (
            <Product
              key={index}
              product={product}
              handleOnClick={handleOnClick}
              type={type}
            />
          ))}
        </div>
      )}
      {bottomBoundaryElement}
    </>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
  handleOnClick: PropTypes.func,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  bottomBoundaryElement: PropTypes.object,
};

export default ProductList;
