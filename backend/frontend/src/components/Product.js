import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useAuth } from "./AuthContext";

export const types = {
  addToCart: "addToCart",
  deleteProduct: "deleteProduct",
};

const Product = ({ product, handleOnClick, type, removeProduct }) => {
  const { djangoUserId } = useAuth();

  const typeToButton = {
    [types.addToCart]: (
      <Button
        onClick={() => handleOnClick(product)}
        className="addToCartBtn"
        disabled={djangoUserId === product.seller}
        variant="light"
      >
        Add To Cart
      </Button>
    ),
    [types.deleteProduct]: (
      <Button
        onClick={() => {
          handleOnClick(product);
          removeProduct(product);
        }}
        className="deleteProductBtn"
        variant="danger"
      >
        Delete Product
      </Button>
    ),
  };

  const id = product.id;
  const imageURL = product.image;
  const name = product.name;
  const price = product.price;

  return (
    <Card>
      <Link to={`/products/${id}`}>
        <Card.Img variant="top" src={imageURL}></Card.Img>
        <div style={{ flex: "1 1 auto", padding: "1rem", height: "5rem" }}>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Price : S${price}</Card.Text>
        </div>
      </Link>
      {typeToButton[type]}
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object,
  handleOnClick: PropTypes.func,
  type: PropTypes.string,
  removeProduct: PropTypes.func,
};

export default Product;
